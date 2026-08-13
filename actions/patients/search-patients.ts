"use server";

import { requirePermission } from "@/lib/auth/guards";
import { patientService } from "@/services/patient.service";

import type { PatientSearchInput } from "@/validations/patient.schema";

export async function searchPatients(filters: PatientSearchInput) {
  await requirePermission("patients.read");

  return patientService.searchPatients(filters);
}
