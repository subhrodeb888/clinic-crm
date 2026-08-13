"use server";

import { revalidatePath } from "next/cache";

import { requirePermission } from "@/lib/auth/guards";
import { patientService } from "@/services/patient.service";

import type { UpdatePatientInput } from "@/validations/patient.schema";

export async function updatePatient(id: string, data: UpdatePatientInput) {
  await requirePermission("patients.manage");

  const patient = await patientService.updatePatient(id, data);

  revalidatePath("/patients");

  revalidatePath(`/patients/${id}`);

  return patient;
}
