"use server";

import { revalidatePath } from "next/cache";

import { requirePermission } from "@/lib/auth/guards";
import { patientService } from "@/services/patient.service";

export async function deletePatient(id: string) {
  await requirePermission("patients.manage");

  const patient = await patientService.deletePatient(id);

  revalidatePath("/patients");

  return patient;
}
