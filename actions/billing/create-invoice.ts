"use server";

import { revalidatePath } from "next/cache";

import { requirePermission } from "@/lib/auth/guards";
import { invoiceService } from "@/services/invoice.service";

import type { InvoiceFormValues } from "@/validations/invoice.schema";

export async function createInvoice(input: InvoiceFormValues) {
  await requirePermission("billing.manage");

  const invoice = await invoiceService.createInvoice(input);

  revalidatePath("/billing");

  return invoice;
}
