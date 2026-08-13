import {
  date,
  pgTable,
  text,
  timestamp,
  uuid,
  numeric,
} from "drizzle-orm/pg-core";

export const patients = pgTable("patients", {
  id: uuid("id").defaultRandom().primaryKey(),

  firstName: text("first_name").notNull(),

  lastName: text("last_name").notNull(),

  email: text("email"),

  phone: text("phone").notNull(),

  gender: text("gender").notNull(),

  dateOfBirth: date("date_of_birth"),

  bloodGroup: text("blood_group"),

  address: text("address"),

  notes: text("notes"),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  emergencyContact: text("emergency_contact"),

  assignedDoctorId: uuid("assigned_doctor_id"),

  lastVisit: timestamp("last_visit"),

  balance: numeric("balance", {
    precision: 10,
    scale: 2,
  })
    .default("0")
    .notNull(),

  status: text("status").default("active").notNull(),
});
