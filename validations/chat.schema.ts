import { z } from "zod";

import { retrieveContextSchema } from "./search.schema";

// Chat reuses the retrieval contract (patientId, question, limit) and adds an
// optional sessionId for continuing an existing conversation.
export const chatInputSchema = retrieveContextSchema.extend({
  sessionId: z.uuid("sessionId must be a valid UUID").optional(),
});

// What callers pass: limit and sessionId may be omitted.
export type ChatInput = z.input<typeof chatInputSchema>;

// What validated consumers receive: limit is always present.
export type ChatData = z.output<typeof chatInputSchema>;
