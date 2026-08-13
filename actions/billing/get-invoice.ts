"use server";

import { requirePermission } from "@/lib/auth/guards";
import { invoiceService } from "@/services/invoice.service";

export async function getInvoice(id: string) {
  await requirePermission("billing.manage");

  return invoiceService.getInvoice(id);
}