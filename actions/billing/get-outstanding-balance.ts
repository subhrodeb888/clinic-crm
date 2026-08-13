"use server";

import { requirePermission } from "@/lib/auth/guards";
import { invoiceService } from "@/services/invoice.service";

export async function getOutstandingBalance(patientId: string) {
  await requirePermission("billing.manage");

  return invoiceService.getOutstandingBalance(patientId);
}
