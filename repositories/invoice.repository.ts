// Import helper functions for SQL ORDER BY DESC and WHERE =
import { desc, eq, sql } from "drizzle-orm";

// Import database connection
import { db } from "@/db";

// Import database tables
import { invoices, invoiceItems, patients } from "@/db/schema";

import { PaymentMethod } from "@/types/invoice";
import { InvoiceStatus } from "@/types/enums";

// Repository class for invoice database operations
export class InvoiceRepository {
  // Reusable base invoice query
  private invoiceQuery() {
    // Start SELECT query
    return (
      db

        // Choose columns to return
        .select({
          id: invoices.id, // invoice id
          patientId: invoices.patientId, // patient id
          subtotal: invoices.subtotal, // subtotal amount
          discount: invoices.discount, // discount amount
          total: invoices.total, // final total
          paymentMethod: invoices.paymentMethod, // payment method
          status: invoices.status, // payment status
          issuedAt: invoices.issuedAt, // invoice date

          // Nested patient object
          patient: {
            id: patients.id, // patient id
            firstName: patients.firstName, // first name
            lastName: patients.lastName, // last name
            phone: patients.phone, // phone number
          },
        })

        // Main table
        .from(invoices)

        // Join patient table
        .leftJoin(patients, eq(invoices.patientId, patients.id))
    );
  }

  // Get all invoices
  async getInvoices() {
    // Base query + newest first
    return this.invoiceQuery().orderBy(desc(invoices.issuedAt));
  }

  // Get one invoice by id
  async getInvoiceById(id: string) {
    // Execute query
    const [invoice] = await this.invoiceQuery().where(eq(invoices.id, id));

    // Return invoice or null
    return invoice ?? null;
  }

  // Get items belonging to an invoice
  async getInvoiceItems(invoiceId: string) {
    // Query invoice_items table
    return (
      db

        // Select columns
        .select({
          id: invoiceItems.id, // item id
          invoiceId: invoiceItems.invoiceId, // invoice id
          name: invoiceItems.name, // item name
          quantity: invoiceItems.quantity, // quantity
          price: invoiceItems.price, // price
        })

        // From invoice_items
        .from(invoiceItems)

        // Only items for this invoice
        .where(eq(invoiceItems.invoiceId, invoiceId))
    );
  }

  async getInvoicesByPatient(patientId: string) {
    return this.invoiceQuery()
      .where(eq(invoices.patientId, patientId))
      .orderBy(desc(invoices.issuedAt));
  }

  async createInvoice(data: {
    patientId: string;
    subtotal: number;
    discount: number;
    total: number;
    paymentMethod: PaymentMethod;
    status: InvoiceStatus;
  }) {
    const [invoice] = await db
      .insert(invoices)
      .values({
        patientId: data.patientId,
        subtotal: String(data.subtotal),
        discount: String(data.discount),
        total: String(data.total),
        paymentMethod: data.paymentMethod,
        status: data.status,
      })
      .returning();

    return invoice;
  }

  async createInvoiceItems(
    invoiceId: string,
    items: {
      name: string;
      quantity: number;
      price: number;
    }[],
  ) {
    if (items.length === 0) return [];

    return db
      .insert(invoiceItems)
      .values(
        items.map((item) => ({
          invoiceId,
          name: item.name,
          quantity: item.quantity,
          price: String(item.price),
        })),
      )
      .returning();
  }

  async updateInvoiceStatus(invoiceId: string, status: InvoiceStatus) {
    const [invoice] = await db
      .update(invoices)
      .set({
        status,
      })
      .where(eq(invoices.id, invoiceId))
      .returning();

    return invoice;
  }

  async getOutstandingBalancesByPatient() {
    return db
      .select({
        patientId: invoices.patientId,
        balance: sql<string>`
        COALESCE(
          SUM(
            CASE
              WHEN ${invoices.status} IN ('pending', 'partial')
              THEN ${invoices.total}
              ELSE 0
            END
          ),
          0
        )
      `,
      })
      .from(invoices)
      .groupBy(invoices.patientId);
  }
}

// Create singleton instance
export const invoiceRepository = new InvoiceRepository();
