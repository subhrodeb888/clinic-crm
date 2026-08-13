import { date, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const appointments = pgTable("appointments", {
  id: uuid("id").defaultRandom().primaryKey(),

  patientId: uuid("patient_id").notNull(),

  doctorId: uuid("doctor_id").notNull(),

  appointmentDate: date("appointment_date").notNull(),

  startTime: text("start_time").notNull(),

  endTime: text("end_time").notNull(),

  status: text("status").default("scheduled").notNull(),

  queueStatus: text("queue_status").default("waiting").notNull(),

  reason: text("reason"),

  notes: text("notes"),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
