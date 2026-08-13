"use server";

import { auth } from "@/auth";

import type { ChatSession } from "@/repositories/chat.repository";
import { chatService } from "@/services/chat.service";
import {
  documentAuthorizationService,
  DocumentAuthorizationError,
} from "@/services/document-authorization.service";

type GetChatSessionsResult =
  | { success: true; sessions: ChatSession[] }
  | { success: false; error: string };

export async function getChatSessions(
  patientId: string,
): Promise<GetChatSessionsResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  if (!patientId) {
    return { success: false, error: "patientId is required" };
  }

  try {
    await documentAuthorizationService.requirePatientAccess(
      session,
      patientId,
    );

    const sessions = await chatService.getSessions(patientId);

    return { success: true, sessions };
  } catch (error) {
    if (error instanceof DocumentAuthorizationError) {
      return { success: false, error: error.message };
    }

    console.error("Failed to load chat sessions:", error);

    return { success: false, error: "Failed to load chat sessions" };
  }
}
