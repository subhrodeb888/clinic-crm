"use server";

import { revalidatePath } from "next/cache";

import { requirePermission } from "@/lib/auth/guards";
import { prescriptionService } from "@/services/prescription.service";

import {
  createPrescriptionSchema,
  type CreatePrescriptionInput,
} from "@/validations/prescription.schema";

export async function createPrescription(input: CreatePrescriptionInput) {
  await requirePermission("consultations.manage");

  const data = createPrescriptionSchema.parse(input);

  const prescription = await prescriptionService.createPrescription(data);

  revalidatePath(`/doctors/consultations/${data.appointmentId}`);

  return prescription;
}
