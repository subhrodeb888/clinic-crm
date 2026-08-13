import "dotenv/config";

import { randomUUID } from "node:crypto";

import OpenAI from "openai";

import { db } from "@/db";
import { patients, users } from "@/db/schema";
import { documentRepository } from "@/repositories/document.repository";
import { documentChunkRepository } from "@/repositories/document-chunk.repository";
import { searchRepository } from "@/repositories/search.repository";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

async function main() {
  const [user] = await db.select().from(users).limit(1);
  const [patient] = await db.select().from(patients).limit(1);

  if (!user || !patient) {
    console.error("No user or patient found. Run `npm run db:seed` first.");
    process.exit(1);
  }

  // Create a document for this patient.
  const document = await documentRepository.create({
    patientId: patient.id,
    uploadedBy: user.id,
    filename: `${randomUUID()}.pdf`,
    originalFilename: "search-test.pdf",
    mimeType: "application/pdf",
    fileSize: 100,
    storagePath: `practice/search-${randomUUID()}.pdf`,
    documentType: "OTHER",
  });

  // Create 3 chunks with distinct content.
  const chunkContents = [
    "The patient has essential hypertension and requires ongoing blood pressure monitoring.",
    "The patient was diagnosed with type 2 diabetes and needs regular glucose checks.",
    "The patient is recovering well from knee surgery and should continue physiotherapy.",
  ];

  await documentChunkRepository.createMany(
    chunkContents.map((content, chunkIndex) => ({
      documentId: document.id,
      chunkIndex,
      content,
    })),
  );

  // Generate + save embeddings for each chunk.
  const savedChunks = await documentChunkRepository.findByDocument(document.id);

  for (const chunk of savedChunks) {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: chunk.content,
    });

    const embedding = response.data[0]?.embedding;

    if (!embedding) {
      throw new Error(`No embedding returned for chunk ${chunk.id}`);
    }

    await documentChunkRepository.updateEmbedding(chunk.id, embedding);
  }

  // Query with an embedding for "high blood pressure treatment".
  const queryResponse = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: "high blood pressure treatment plan",
  });

  const queryEmbedding = queryResponse.data[0]?.embedding;

  if (!queryEmbedding) {
    throw new Error("No query embedding returned.");
  }

  // Run the similarity search.
  const results = await searchRepository.findSimilarChunks({
    patientId: patient.id,
    queryEmbedding,
    limit: 3,
  });

  console.log(`Results: ${results.length}`);
  for (const result of results) {
    console.log(`  similarity=${result.similarity.toFixed(4)} doc=${result.documentId.slice(0, 8)} chunk="${result.chunk.slice(0, 60)}..."`);
  }

  // Verify ordering: similarities should be descending.
  const sorted = results.every(
    (r, i) => i === 0 || results[i - 1].similarity >= r.similarity,
  );

  const success = results.length > 0 && sorted;
  console.log(success ? "SEARCH TEST PASSED" : "SEARCH TEST FAILED");

  // Clean up.
  await documentRepository.delete(document.id);
}

main().catch((error) => {
  console.error("Search test failed:", error);
  process.exit(1);
});