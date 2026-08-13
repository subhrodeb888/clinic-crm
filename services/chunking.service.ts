export class ChunkingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChunkingError";
  }
}

export const DEFAULT_CHUNK_SIZE = 800;

export const DEFAULT_CHUNK_OVERLAP = 200;

export class ChunkingService {
  constructor(
    private readonly chunkSize: number = DEFAULT_CHUNK_SIZE,
    private readonly overlap: number = DEFAULT_CHUNK_OVERLAP,
  ) {
    if (this.chunkSize <= 0) {
      throw new ChunkingError("Chunk size must be greater than 0.");
    }

    if (this.overlap >= this.chunkSize) {
      throw new ChunkingError("Overlap must be less than chunk size.");
    }
  }

  chunk(text: string): string[] {
    const input = text.trim();

    if (input.length === 0) {
      throw new ChunkingError("Input text is empty.");
    }

    const step = this.chunkSize - this.overlap;
    const chunks: string[] = [];

    for (let start = 0; start < input.length; start += step) {
      const rawChunk = input.slice(start, start + this.chunkSize).trim();

      // Ignore chunks containing only whitespace.
      if (rawChunk.length > 0) {
        chunks.push(rawChunk);
      }
    }

    return chunks;
  }
}

export const chunkingService = new ChunkingService();