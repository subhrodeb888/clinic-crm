import {
  searchRepository,
  type SearchRepository,
  type SimilarChunkResult,
} from "@/repositories/search.repository";
import {
  embeddingService,
  type EmbeddingService,
} from "@/services/embedding.service";

const DEFAULT_SEARCH_LIMIT = 5;

export type SearchInput = {
  patientId: string;
  question: string;
  limit?: number;
};

export class SearchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SearchError";
  }
}

export class SearchService {
  constructor(
    private readonly embeddings: EmbeddingService = embeddingService,
    private readonly searches: SearchRepository = searchRepository,
  ) {}

  async search(input: SearchInput): Promise<SimilarChunkResult[]> {
    const validated = this.validate(input);

    const queryEmbedding = await this.embeddings.embed(validated.question);

    return this.searches.findSimilarChunks({
      patientId: validated.patientId,
      queryEmbedding,
      limit: validated.limit,
    });
  }

  private validate(input: SearchInput): Required<SearchInput> {
    const patientId = input.patientId.trim();
    const question = input.question.trim();
    const limit = input.limit ?? DEFAULT_SEARCH_LIMIT;

    if (!patientId) {
      throw new SearchError("patientId is required");
    }

    if (!question) {
      throw new SearchError("question is required");
    }

    if (!Number.isInteger(limit) || limit <= 0) {
      throw new SearchError("limit must be a positive integer");
    }

    return {
      patientId,
      question,
      limit,
    };
  }
}

export const searchService = new SearchService();
