"use server";

import { auth } from "@/auth";

import type { ChatMessage } from "@/repositories/chat.repository";
import { chatService } from "@/services/chat.service";
import {
  documentAuthorizationService,
  DocumentAuthorizationError,
} from "@/services/document-authorization.service";

type GetChatMessagesResult =
  | { success: true; messages: ChatMessage[] }
  | { success: false; error: string };

export async function getChatMessages(
  chatSessionId: string,
  patientId: string,
): Promise<GetChatMessagesResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  if (!chatSessionId || !patientId) {
    return { success: false, error: "chatSessionId and patientId are required" };
  }

  try {
    // Authorize against the patient first, then verify the conversation
    // actually belongs to that patient before returning its messages.
    await documentAuthorizationService.requirePatientAccess(
      session,
      patientId,
    );

    const chatSession = await chatService.getSession(chatSessionId);

    if (!chatSession || chatSession.patientId !== patientId) {
      return { success: false, error: "Chat session not found" };
    }

    const messages = await chatService.getMessages(chatSessionId);

    return { success: true, messages };
  } catch (error) {
    if (error instanceof DocumentAuthorizationError) {
      return { success: false, error: error.message };
    }

    console.error("Failed to load chat messages:", error);

    return { success: false, error: "Failed to load chat messages" };
  }
}
