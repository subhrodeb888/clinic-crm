import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

export const prescriptions = pgTable("prescriptions", {
  id: uuid("id").defaultRandom().primaryKey(),

  consultationId: uuid("consultation_id").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
