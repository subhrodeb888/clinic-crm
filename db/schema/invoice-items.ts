import { integer, numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const invoiceItems = pgTable("invoice_items", {
  id: uuid("id").defaultRandom().primaryKey(),

  invoiceId: uuid("invoice_id").notNull(),

  name: text("name").notNull(),

  quantity: integer("quantity").notNull(),

  price: numeric("price", {
    precision: 10,
    scale: 2,
  }).notNull(),
});
