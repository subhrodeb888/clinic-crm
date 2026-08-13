import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const prescriptionItems = pgTable("prescription_items", {
  id: uuid("id").defaultRandom().primaryKey(),

  prescriptionId: uuid("prescription_id").notNull(),

  medicineName: text("medicine_name").notNull(),

  dosage: text("dosage"),

  frequency: text("frequency"),

  durationDays: integer("duration_days"),

  instructions: text("instructions"),
});
