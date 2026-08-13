import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const doctors = pgTable("doctors", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: text("user_id").notNull().unique(),

  specialization: text("specialization"),

  licenseNumber: text("license_number"),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
