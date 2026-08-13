import { and, asc, eq, sql, type SQL } from "drizzle-orm";
import { cosineDistance } from "drizzle-orm/sql/functions/vector";

import { db } from "@/db";
import { documentChunks, documents } from "@/db/schema";

export type FindSimilarChunksInput = {
  patientId: string;
  queryEmbedding: number[];
  limit: number;

  // Minimum cosine similarity (1 - cosine distance) a chunk must reach to be
  // returned, e.g. 0.2 filters out weak matches. Applied in PostgreSQL.
  // When omitted, no threshold is applied.
  minSimilarity?: number;
};

export type SimilarChunkResult = {
  chunk: string;
  similarity: number;

  // Citation metadata — everything needed to attribute a chunk back to its
  // source document in the UI.
  documentId: string;
  filename: string;
  originalFilename: string;
  documentType: (typeof documents.$inferSelect)["documentType"];
  chunkIndex: number;
};

export class SearchRepository {
  async findSimilarChunks(
    input: FindSimilarChunksInput,
  ): Promise<SimilarChunkResult[]> {
    const similarity = sql<number>`1.0::float8 - (${cosineDistance(
      documentChunks.embedding,
      input.queryEmbedding,
    )})`;

    // Every condition below is evaluated by PostgreSQL.
    const conditions: SQL[] = [
      // Patient isolation.
      eq(documents.patientId, input.patientId),

      // Only fully processed documents are searchable. Chunks are inserted
      // before the document reaches READY, so without this filter partially
      // embedded documents could leak into results.
      eq(documents.status, "READY"),

      // Skip chunks whose embedding has not been generated yet.
      sql`${documentChunks.embedding} IS NOT NULL`,
    ];

    // Optional relevance threshold — the caller owns the policy, this
    // repository only applies it.
    if (input.minSimilarity !== undefined) {
      conditions.push(sql`${similarity} >= ${input.minSimilarity}`);
    }

    return db
      .select({
        chunk: documentChunks.content,
        similarity,

        // Citation metadata.
        documentId: documentChunks.documentId,
        filename: documents.filename,
        originalFilename: documents.originalFilename,
        documentType: documents.documentType,
        chunkIndex: documentChunks.chunkIndex,
      })
      .from(documentChunks)
      .innerJoin(documents, eq(documentChunks.documentId, documents.id))
      .where(and(...conditions))
      .orderBy(
        asc(cosineDistance(documentChunks.embedding, input.queryEmbedding)),
      )
      .limit(input.limit);
  }
}

export const searchRepository = new SearchRepository();
