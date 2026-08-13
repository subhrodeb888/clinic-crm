import { InvoiceStatus } from "@/types/enums";
import { invoiceRepository } from "@/repositories/invoice.repository";

import { mapInvoiceToUI } from "./mappers/invoice.mapper";
import type { InvoiceFormValues } from "@/validations/invoice.schema";

export class InvoiceService {
  async getInvoices() {
    const invoices = await invoiceRepository.getInvoices();
    return invoices.map(mapInvoiceToUI);
  }

  async getInvoice(id: string) {
    const invoice = await invoiceRepository.getInvoiceById(id);

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    const items = await invoiceRepository.getInvoiceItems(id);

    return {
      ...mapInvoiceToUI(invoice),

      items: items.map((item) => ({
        ...item,

        price: Number(item.price ?? 0),
      })),
    };
  }

  async getInvoicesByPatient(patientId: string) {
    const invoices = await invoiceRepository.getInvoicesByPatient(patientId);

    return invoices.map(mapInvoiceToUI);
  }

  async createInvoice(data: InvoiceFormValues) {
    const subtotal = data.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );

    const taxableAmount = subtotal - data.discount;

    const tax = taxableAmount * (data.taxRate / 100);

    const total = taxableAmount + tax;

    const invoice = await invoiceRepository.createInvoice({
      patientId: data.patientId,
      subtotal,
      discount: data.discount,
      total,
      paymentMethod: data.paymentMethod,
      status: "pending",
    });

    await invoiceRepository.createInvoiceItems(invoice.id, data.items);

    return invoice;
  }

  async getBillingKPIs() {
    const invoices = await invoiceRepository.getInvoices();

    const mappedInvoices = invoices.map(mapInvoiceToUI);

    const totalRevenue = mappedInvoices.reduce(
      (sum, invoice) => sum + invoice.total,
      0,
    );

    const pendingRevenue = mappedInvoices
      .filter(
        (invoice) =>
          invoice.status === "pending" || invoice.status === "partial",
      )
      .reduce((sum, invoice) => sum + invoice.total, 0);

    const paidInvoices = mappedInvoices.filter(
      (invoice) => invoice.status === "paid",
    ).length;

    const refundedInvoices = mappedInvoices.filter(
      (invoice) => invoice.status === "refunded",
    ).length;

    return {
      totalRevenue,
      pendingRevenue,
      paidInvoices,
      refundedInvoices,
    };
  }

  async getOutstandingBalance(patientId: string) {
    const invoices = await invoiceRepository.getInvoicesByPatient(patientId);

    return invoices
      .filter(
        (invoice) =>
          invoice.status === "pending" || invoice.status === "partial",
      )
      .reduce((sum, invoice) => sum + Number(invoice.total), 0);
  }

  async updateInvoiceStatus(invoiceId: string, status: InvoiceStatus) {
    return invoiceRepository.updateInvoiceStatus(invoiceId, status);
  }

  async getOutstandingBalancesByPatient() {
    return invoiceRepository.getOutstandingBalancesByPatient();
  }
}

export const invoiceService = new InvoiceService();
