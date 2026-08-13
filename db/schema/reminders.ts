import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const reminders = pgTable("reminders", {
  id: uuid("id").defaultRandom().primaryKey(),

  patientId: uuid("patient_id").notNull(),

  title: text("title").notNull(),

  message: text("message"),

  scheduledFor: timestamp("scheduled_for").notNull(),

  sent: boolean("sent").default(false).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
