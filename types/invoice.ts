import { InvoiceStatus } from "./enums";

import { Patient } from "./patient";

export type PaymentMethod = "cash" | "upi" | "card" | "bank_transfer";

export type InvoiceItem = {
  id: string;

  name: string;

  quantity: number;

  price: number;
};

export type InvoiceFormValues = {
  items: Omit<InvoiceItem, "id">[];
  discount: number;
  paymentMethod: PaymentMethod;
};

export type Invoice = {
  id: string;

  patientId: string;

  patient: Patient;

  items: InvoiceItem[];

  subtotal: number;

  discount: number;

  total: number;

  status: InvoiceStatus;

  paymentMethod: PaymentMethod;

  issuedAt: string;
};
