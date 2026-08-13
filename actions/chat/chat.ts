"use server";

import { auth } from "@/auth";

import { AnswerGenerationError } from "@/services/ai.service";
import { chatService, ChatError } from "@/services/chat.service";
import {
  documentAuthorizationService,
  DocumentAuthorizationError,
} from "@/services/document-authorization.service";
import {
  PromptBuilderError,
  type PromptCitation,
} from "@/services/prompt-builder.service";
import { SearchError } from "@/services/search.service";
import { chatInputSchema, type ChatInput } from "@/validations/chat.schema";

type ChatResult =
  | {
      success: true;
      sessionId: string;
      answer: string;
      citations: PromptCitation[];
    }
  | { success: false; error: string };

export async function chat(input: ChatInput): Promise<ChatResult> {
  // 1. Authenticate.
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // 2. Authorize access to this patient's documents. Fails closed before
    //    any retrieval or generation runs.
    await documentAuthorizationService.requirePatientAccess(
      session,
      input.patientId,
    );

    // 3. Validate the input (patientId, question, limit, sessionId).
    const parsed = chatInputSchema.safeParse(input);

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message ?? "Invalid input",
      };
    }

    // 4. Retrieve context, build the prompt, generate the answer, and persist
    //    both messages — orchestrated by the chat service.
    const result = await chatService.ask({
      patientId: parsed.data.patientId,
      userId: session.user.id,
      question: parsed.data.question,
      limit: parsed.data.limit,
      sessionId: parsed.data.sessionId,
    });

    // 5. Return the answer with the citation map resolving each [N]
    //    placeholder back to its source document and chunk.
    return {
      success: true,
      sessionId: result.sessionId,
      answer: result.answer,
      citations: result.citations,
    };
  } catch (error) {
    if (
      error instanceof DocumentAuthorizationError ||
      error instanceof ChatError ||
      error instanceof SearchError ||
      error instanceof PromptBuilderError ||
      error instanceof AnswerGenerationError
    ) {
      return { success: false, error: error.message };
    }

    console.error("Chat failed:", error);

    return { success: false, error: "Failed to generate an answer" };
  }
}
