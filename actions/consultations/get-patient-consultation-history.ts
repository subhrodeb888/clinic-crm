"use server";

import { requirePermission } from "@/lib/auth/guards";
import { consultationService } from "@/services/consultation.service";

export async function getPatientConsultationHistory(patientId: string) {
  await requirePermission("patients.read");

  return consultationService.getPatientConsultationHistory(patientId);
}
