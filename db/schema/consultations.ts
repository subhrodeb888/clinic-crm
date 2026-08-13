import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const consultations = pgTable("consultations", {
  id: uuid("id").defaultRandom().primaryKey(),

  patientId: uuid("patient_id").notNull(),

  doctorId: uuid("doctor_id").notNull(),

  appointmentId: uuid("appointment_id"),

  chiefComplaint: text("chief_complaint"),

  diagnosis: text("diagnosis"),

  notes: text("notes"),

  aiSummary: text("ai_summary"),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  status: text("status")
    .$type<"draft" | "completed">()
    .default("draft")
    .notNull(),
});
