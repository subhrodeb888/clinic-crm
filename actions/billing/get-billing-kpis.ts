"use server";

import { requirePermission } from "@/lib/auth/guards";
import { invoiceService } from "@/services/invoice.service";

export async function getBillingKPIs() {
  await requirePermission("billing.manage");

  return invoiceService.getBillingKPIs();
}