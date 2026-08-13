import { documentChunkRepository } from "@/repositories/document-chunk.repository";
import {
  documentRepository,
  type DocumentStatus,
} from "@/repositories/document.repository";
import { chunkingService } from "@/services/chunking.service";
import { embeddingService } from "@/services/embedding.service";
import { pdfService } from "@/services/pdf.service";
import { storageService } from "@/services/storage.service";
import { textCleanerService } from "@/services/text-cleaner.service";

export class DocumentProcessingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DocumentProcessingError";
  }
}

export class DocumentProcessingService {
  async process(documentId: string): Promise<void> {
    try {
      const document = await documentRepository.getById(documentId);

      if (!document) {
        throw new DocumentProcessingError(
          `Document not found: ${documentId}`,
        );
      }

      await this.setStatus(documentId, "PROCESSING");

      // 1. Download the PDF from Cloudflare R2.
      const pdfBuffer = await storageService.downloadFile(document.storagePath);

      // 2. Extract text.
      const rawText = await pdfService.extractText(pdfBuffer);

      // 3. Clean text.
      const cleanedText = textCleanerService.clean(rawText);

      // 4. Chunk text.
      const chunks = chunkingService.chunk(cleanedText);

      // 5. Save chunks (idempotent — remove any previous chunks first).
      await documentChunkRepository.deleteByDocument(documentId);

      await documentChunkRepository.createMany(
        chunks.map((content, chunkIndex) => ({
          documentId,
          chunkIndex,
          content,
        })),
      );

      // 6. Generate and persist an embedding for every chunk.
      const savedChunks = await documentChunkRepository.findByDocument(
        documentId,
      );

      for (const chunk of savedChunks) {
        const embedding = await embeddingService.embed(chunk.content);

        await documentChunkRepository.updateEmbedding(chunk.id, embedding);
      }

      // 7. Mark the document as ready.
      await this.setStatus(documentId, "READY");
    } catch (error) {
      console.error(
        `Document processing failed for document: ${documentId}`,
        error,
      );

      try {
        await this.setStatus(documentId, "FAILED");
      } catch (statusError) {
        console.error(
          `Failed to mark document as FAILED: ${documentId}`,
          statusError,
        );
      }

      throw error;
    }
  }

  private async setStatus(documentId: string, status: DocumentStatus) {
    await documentRepository.update(documentId, { status });
  }
}

export const documentProcessingService = new DocumentProcessingService();