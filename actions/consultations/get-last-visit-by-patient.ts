"use server";

import { requirePermission } from "@/lib/auth/guards";
import { consultationService } from "@/services/consultation.service";

export async function getLastVisitByPatient(patientId: string) {
  await requirePermission("patients.read");

  return consultationService.getLastVisitByPatient(patientId);
}
