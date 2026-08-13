import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const activityLogs = pgTable("activity_logs", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: text("user_id"),

  action: text("action").notNull(),

  entityType: text("entity_type").notNull(),

  entityId: text("entity_id").notNull(),

  metadata: jsonb("metadata").default({}),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
