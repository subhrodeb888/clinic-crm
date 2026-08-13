"use server";

import { requirePermission } from "@/lib/auth/guards";
import { patientService } from "@/services/patient.service";

export async function getPatients() {
  await requirePermission("patients.read");

  return patientService.getPatients();
}
