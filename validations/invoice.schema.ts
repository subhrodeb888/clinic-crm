import { z } from "zod";

export const invoiceSchema = z.object({
  patientId: z.string().min(1),

  paymentMethod: z.enum([
    "cash",
    "upi",
    "card",
    "bank_transfer",
  ]),

  discount: z.number().min(0),

  taxRate: z.number().min(0),

  items: z.array(
    z.object({
      name: z.string().min(1),
      quantity: z.number().min(1),
      price: z.number().min(0),
    }),
  ),
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;
