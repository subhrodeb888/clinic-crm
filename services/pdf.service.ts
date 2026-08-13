import { PDFParse } from "pdf-parse";

export class PdfExtractionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PdfExtractionError";
  }
}

export class PdfService {
  async extractText(pdfBuffer: Buffer): Promise<string> {
    let parser: PDFParse | null = null;

    try {
      parser = new PDFParse({ data: pdfBuffer });

      const result = await parser.getText();

      const text = result.text.trim();

      if (!text) {
        throw new PdfExtractionError("No extractable text found in PDF.");
      }

      return text;
    } catch (error) {
      if (error instanceof PdfExtractionError) {
        throw error;
      }

      throw new PdfExtractionError(
        `Failed to extract text from PDF: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    } finally {
      if (parser) {
        try {
          await parser.destroy();
        } catch {
          // Ignore cleanup errors.
        }
      }
    }
  }
}

export const pdfService = new PdfService();
