"use server";

import { auth } from "@/auth";

import type { SimilarChunkResult } from "@/repositories/search.repository";
import {
  documentAuthorizationService,
  DocumentAuthorizationError,
} from "@/services/document-authorization.service";
import { searchService, SearchError } from "@/services/search.service";
import {
  retrieveContextSchema,
  type RetrieveContextInput,
} from "@/validations/search.schema";

type RetrieveContextResult =
  | { success: true; chunks: SimilarChunkResult[] }
  | { success: false; error: string };

export async function retrieveContext(
  input: RetrieveContextInput,
): Promise<RetrieveContextResult> {
  // 1. Authenticate.
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // 2. Authorize access to this patient's documents. Fails closed: an
    //    unknown or inaccessible patientId throws before any search runs.
    await documentAuthorizationService.requirePatientAccess(
      session,
      input.patientId,
    );

    // 3. Validate the input.
    const parsed = retrieveContextSchema.safeParse(input);

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message ?? "Invalid input",
      };
    }

    // 4. Embed the question and run the semantic similarity search.
    const chunks = await searchService.search(parsed.data);

    // 5. Return the retrieved chunks.
    return { success: true, chunks };
  } catch (error) {
    if (error instanceof DocumentAuthorizationError) {
      return { success: false, error: error.message };
    }

    if (error instanceof SearchError) {
      return { success: false, error: error.message };
    }

    console.error("Failed to retrieve context:", error);

    return { success: false, error: "Failed to retrieve context" };
  }
}
