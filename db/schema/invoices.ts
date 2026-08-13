import { numeric, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const invoices = pgTable("invoices", {
  id: uuid("id").defaultRandom().primaryKey(),

  patientId: uuid("patient_id").notNull(),

  subtotal: numeric("subtotal", {
    precision: 10,
    scale: 2,
  }).notNull(),

  discount: numeric("discount", {
    precision: 10,
    scale: 2,
  })
    .notNull()
    .default("0"),

  total: numeric("total", {
    precision: 10,
    scale: 2,
  }).notNull(),

  paymentMethod: text("payment_method").notNull(),

  status: text("status").notNull().default("pending"),

  issuedAt: timestamp("issued_at").defaultNow().notNull(),
});
