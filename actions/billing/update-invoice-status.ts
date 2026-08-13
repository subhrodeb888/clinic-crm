"use server";

import { revalidatePath } from "next/cache";

import { requirePermission } from "@/lib/auth/guards";
import { invoiceService } from "@/services/invoice.service";

import { InvoiceStatus } from "@/types/enums";

export async function updateInvoiceStatus(
  invoiceId: string,
  status: InvoiceStatus,
) {
  await requirePermission("billing.manage");

  const invoice = await invoiceService.updateInvoiceStatus(invoiceId, status);

  revalidatePath("/billing");

  return invoice;
}
