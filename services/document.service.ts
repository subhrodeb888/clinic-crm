import { randomUUID } from "node:crypto";

import {
  documentRepository,
  type DocumentType,
} from "@/repositories/document.repository";
import { storageService } from "@/services/storage.service";

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB
const ALLOWED_MIME_TYPE = "application/pdf";

// Custom error class for file upload validation failures.
export class DocumentUploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DocumentUploadError";
  }
}

// Handles uploading, retrieving, and deleting patient documents with storage cleanup.
export class DocumentService {
  async upload(input: {
    patientId: string;
    uploadedBy: string;
    documentType: DocumentType;
    file: File;
  }) {
    // Reject files that are too large or not PDFs.
    this.validateFile(input.file);

    // Generate a unique filename and build the storage path.
    const filename = `${randomUUID()}.pdf`;
    const storagePath = `patients/${input.patientId}/documents/${filename}`;

    // Convert the uploaded File into a Node Buffer for storage.
    const buffer = Buffer.from(await input.file.arrayBuffer());

    // Upload the file bytes to cloud object storage.
    await storageService.uploadFile({
      key: storagePath,
      body: buffer,
      contentType: ALLOWED_MIME_TYPE,
    });

    // Save the document metadata to the database; roll back the upload on failure.
    const document = await documentRepository
      .create({
        patientId: input.patientId,
        uploadedBy: input.uploadedBy,
        filename,
        originalFilename: input.file.name,
        mimeType: input.file.type,
        fileSize: input.file.size,
        storagePath,
        documentType: input.documentType,
      })
      .catch(async (error) => {
        // Compensation: the DB insert failed, so remove the orphaned R2 object.
        try {
          await storageService.deleteFile(storagePath);
        } catch (cleanupError) {
          console.error(
            `Failed to clean up orphaned R2 object: ${storagePath}`,
            cleanupError,
          );
        }

        throw error;
      });

    // The document row exists once the insert succeeds. Trigger processing
    // only after the document is persisted in the database.
    const { documentProcessingService } =
      await import("@/services/document-processing.service");

    await documentProcessingService.process(document.id);

    return document;
  }

  // Fetch all documents for a patient, including the uploader's name.
  async getByPatient(patientId: string) {
    return documentRepository.getByPatientWithUploaderName(patientId);
  }

  // Delete the document record from the DB and remove its file from storage.
  async delete(id: string) {
    const deleted = await documentRepository.delete(id);

    if (!deleted) {
      throw new Error("Document not found");
    }

    // Remove the object from R2. If this fails the DB is already consistent
    // (the row is gone); the orphaned object is logged for manual cleanup.
    try {
      await storageService.deleteFile(deleted.storagePath);
    } catch (error) {
      console.error(
        `Failed to delete R2 object: ${deleted.storagePath}`,
        error,
      );
    }
  }

  // Enforce that only PDFs under 20 MB are accepted.
  private validateFile(file: File) {
    if (file.type !== ALLOWED_MIME_TYPE) {
      throw new DocumentUploadError("Only PDF files are allowed");
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      throw new DocumentUploadError("File must be 20 MB or smaller");
    }
  }
}

export const documentService = new DocumentService();
