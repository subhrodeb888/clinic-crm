import type { Invoice } from "@/types/invoice";

type InvoiceMapperInput = {
  subtotal?: string | number | null;
  discount?: string | number | null;
  total?: string | number | null;
  issuedAt: string | Date;
};

export function mapInvoiceToUI<TInvoice extends InvoiceMapperInput>(
  invoice: TInvoice,
): Invoice {
  return {
    ...invoice,

    subtotal: Number(invoice.subtotal ?? 0),

    discount: Number(invoice.discount ?? 0),

    total: Number(invoice.total ?? 0),

    issuedAt:
      invoice.issuedAt instanceof Date
        ? invoice.issuedAt.toISOString().split("T")[0]
        : invoice.issuedAt,
  } as unknown as Invoice;
}
