import {
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { users } from "./auth";
import { patients } from "./patients";

export const chatMessageRoleEnum = pgEnum("chat_message_role", [
  "user",
  "assistant",
]);

// Citation metadata stored on assistant messages. Structurally matches
// PromptCitation from services/prompt-builder.service.ts (documentType is
// persisted as plain text).
export type ChatCitation = {
  ref: number;
  documentId: string;
  filename: string;
  originalFilename: string;
  documentType: string;
  chunkIndex: number;
  similarity: number;
};

export const chatSessions = pgTable("chat_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),

  patientId: uuid("patient_id")
    .notNull()
    .references(() => patients.id, {
      onDelete: "cascade",
    }),

  userId: text("user_id")
    .notNull()
    .references(() => users.id),

  title: text("title").notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: uuid("id").defaultRandom().primaryKey(),

  sessionId: uuid("session_id")
    .notNull()
    .references(() => chatSessions.id, {
      onDelete: "cascade",
    }),

  role: chatMessageRoleEnum("role").notNull(),

  content: text("content").notNull(),

  citations: jsonb("citations").$type<ChatCitation[]>(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});
