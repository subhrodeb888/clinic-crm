import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  vector,
} from "drizzle-orm/pg-core"; // Imports Drizzle functions for defining the table, columns, and vector index.

import { documents } from "./document"; // Imports the documents table so each chunk can be linked to a document.

export const documentChunks = pgTable(
  "document_chunks", // Creates the database table that stores pieces of documents.
  {
    id: uuid("id").defaultRandom().primaryKey(), // Creates a unique ID for each document chunk.

    documentId: uuid("document_id")
      .notNull()
      .references(() => documents.id, {
        onDelete: "cascade",
      }), // Links the chunk to its document and deletes the chunks if the document is deleted.

    chunkIndex: integer("chunk_index").notNull(), // Stores the position of this chunk within the original document.

    content: text("content").notNull(), // Stores the actual text contained in this chunk.

    embedding: vector("embedding", { dimensions: 1536 }), // Stores the 1536-dimensional vector representation of the chunk for semantic search.

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(), // Stores when the chunk was created.
  },
  (table) => [
    index("document_chunks_embedding_idx").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops"),
    ), // Creates an HNSW index to make cosine-similarity searches over embeddings faster.
  ],
);
