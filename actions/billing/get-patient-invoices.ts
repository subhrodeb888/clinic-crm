"use server";

import { requirePermission } from "@/lib/auth/guards";
import { invoiceService } from "@/services/invoice.service";

export async function getPatientInvoices(patientId: string) {
  await requirePermission("patients.read");

  return invoiceService.getInvoicesByPatient(patientId);
}
