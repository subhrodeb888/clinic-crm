"use server";

import { revalidatePath } from "next/cache";

import { requirePermission } from "@/lib/auth/guards";
import { patientService } from "@/services/patient.service";

import type { CreatePatientInput } from "@/validations/patient.schema";

export async function createPatient(data: CreatePatientInput) {
  await requirePermission("patients.manage");

  const patient = await patientService.createPatient(data);

  revalidatePath("/patients");

  return patient;
}
