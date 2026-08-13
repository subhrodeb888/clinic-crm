import { openai } from "@/openai/client";

const EMBEDDING_MODEL = "text-embedding-3-small";

export class EmbeddingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmbeddingError";
  }
}

export class EmbeddingService {
  async embed(text: string): Promise<number[]> {
    try {
      const response = await openai.embeddings.create({
        model: EMBEDDING_MODEL,
        input: text,
      });

      const embedding = response.data[0]?.embedding;

      if (!embedding) {
        throw new EmbeddingError("OpenAI returned no embedding data.");
      }

      return embedding;
    } catch (error) {
      if (error instanceof EmbeddingError) {
        throw error;
      }

      throw new EmbeddingError(
        `Failed to generate embedding: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    }
  }
}

export const embeddingService = new EmbeddingService();