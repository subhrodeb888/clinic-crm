"use server";

import { requirePermission } from "@/lib/auth/guards";
import { patientService } from "@/services/patient.service";

export async function getPatient(id: string) {
  await requirePermission("patients.read");

  return patientService.getPatient(id);
}
