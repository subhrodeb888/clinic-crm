"use server";

import { requirePermission } from "@/lib/auth/guards";
import { prescriptionService } from "@/services/prescription.service";

export async function countPrescriptionsByPatient(patientId: string) {
  await requirePermission("patients.read");

  return prescriptionService.countPrescriptionsByPatient(patientId);
}
