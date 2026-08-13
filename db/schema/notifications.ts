import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const notifications = pgTable("notifications", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: text("user_id").notNull(),

  title: text("title").notNull(),

  message: text("message"),

  read: boolean("read").default(false).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
