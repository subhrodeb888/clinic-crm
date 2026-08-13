import { z } from "zod";

// Default number of chunks returned when the caller does not specify a limit.
// Mirrors DEFAULT_SEARCH_LIMIT in services/search.service.ts.
const DEFAULT_RETRIEVAL_LIMIT = 5;

const MAX_RETRIEVAL_LIMIT = 20;

// The embedding model context window is 8191 tokens; 2000 characters of
// question text stays well within it.
const MAX_QUESTION_LENGTH = 2000;

export const retrieveContextSchema = z.object({
  patientId: z.uuid("patientId must be a valid UUID"),

  question: z
    .string()
    .trim()
    .min(1, "question is required")
    .max(
      MAX_QUESTION_LENGTH,
      `question must be ${MAX_QUESTION_LENGTH} characters or fewer`,
    ),

  limit: z
    .number()
    .int("limit must be an integer")
    .positive("limit must be a positive integer")
    .max(MAX_RETRIEVAL_LIMIT, `limit must be ${MAX_RETRIEVAL_LIMIT} or fewer`)
    .default(DEFAULT_RETRIEVAL_LIMIT),
});

// What callers pass: limit may be omitted.
export type RetrieveContextInput = z.input<typeof retrieveContextSchema>;

// What validated consumers receive: limit is always present.
export type RetrieveContextData = z.output<typeof retrieveContextSchema>;
