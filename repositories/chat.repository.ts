import { asc, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import {
  chatMessageRoleEnum,
  chatMessages,
  chatSessions,
  type ChatCitation,
} from "@/db/schema";

export type ChatSession = typeof chatSessions.$inferSelect;

export type ChatMessage = typeof chatMessages.$inferSelect;

export type ChatMessageRole = (typeof chatMessageRoleEnum.enumValues)[number];

export type CreateChatMessageData = {
  sessionId: string;
  role: ChatMessageRole;
  content: string;
  citations?: ChatCitation[];
};

export class ChatRepository {
  async createSession(data: {
    patientId: string;
    userId: string;
    title: string;
  }) {
    const [session] = await db.insert(chatSessions).values(data).returning();

    return session;
  }

  async getSessionById(id: string) {
    const [session] = await db
      .select()
      .from(chatSessions)
      .where(eq(chatSessions.id, id));

    return session ?? null;
  }

  async getSessionsByPatient(patientId: string) {
    return db
      .select()
      .from(chatSessions)
      .where(eq(chatSessions.patientId, patientId))
      .orderBy(desc(chatSessions.updatedAt));
  }

  async touchSession(id: string) {
    await db
      .update(chatSessions)
      .set({ updatedAt: new Date() })
      .where(eq(chatSessions.id, id));
  }

  async createMessage(data: CreateChatMessageData) {
    const [message] = await db.insert(chatMessages).values(data).returning();

    return message;
  }

  async getMessagesBySession(sessionId: string) {
    return db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(asc(chatMessages.createdAt), asc(chatMessages.id));
  }
}

export const chatRepository = new ChatRepository();
