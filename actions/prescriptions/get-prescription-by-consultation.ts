"use server";

import { requirePermission } from "@/lib/auth/guards";
import { prescriptionService } from "@/services/prescription.service";

export async function getPrescriptionByConsultation(consultationId: string) {
  await requirePermission("consultations.manage");

  return prescriptionService.getPrescriptionByConsultation(consultationId);
}
