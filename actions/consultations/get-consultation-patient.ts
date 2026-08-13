"use server";

import { requirePermission } from "@/lib/auth/guards";
import { patientService } from "@/services/patient.service";

export async function getConsultationPatient() {
  await requirePermission("consultations.manage");

  const patients =
    await patientService.getPatients();

  return patients[0] ?? null;
}