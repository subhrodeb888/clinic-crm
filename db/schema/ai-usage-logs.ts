import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const aiUsageLogs = pgTable("ai_usage_logs", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: text("user_id").notNull(),

  feature: text("feature").notNull(),

  promptTokens: integer("prompt_tokens"),

  completionTokens: integer("completion_tokens"),

  totalTokens: integer("total_tokens"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
