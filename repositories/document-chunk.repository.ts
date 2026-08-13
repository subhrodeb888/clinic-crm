import { asc, eq } from "drizzle-orm";

import { db } from "@/db";
import { documentChunks } from "@/db/schema";

export type DocumentChunk = typeof documentChunks.$inferSelect;

type DocumentChunkInsert = typeof documentChunks.$inferInsert;

export type CreateDocumentChunkData = Pick<
  DocumentChunkInsert,
  "documentId" | "chunkIndex" | "content"
>;

export class DocumentChunkRepository {
  async createMany(input: CreateDocumentChunkData[]) {
    if (input.length === 0) return [];

    return db
      .insert(documentChunks)
      .values(input)
      .returning();
  }

  async findByDocument(documentId: string) {
    return db
      .select()
      .from(documentChunks)
      .where(eq(documentChunks.documentId, documentId))
      .orderBy(asc(documentChunks.chunkIndex));
  }

  async updateEmbedding(id: string, embedding: number[]) {
    await db
      .update(documentChunks)
      .set({ embedding })
      .where(eq(documentChunks.id, id));
  }

  async deleteByDocument(documentId: string) {
    await db
      .delete(documentChunks)
      .where(eq(documentChunks.documentId, documentId));
  }
}

export const documentChunkRepository = new DocumentChunkRepository();