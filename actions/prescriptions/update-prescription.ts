"use server";

import { revalidatePath } from "next/cache";

import { requirePermission } from "@/lib/auth/guards";
import { prescriptionService } from "@/services/prescription.service";

type UpdatePrescriptionInput = {
  consultationId: string;

  prescriptionId: string;

  medicines: {
    medicine: string;

    dosage: string;

    frequency: string;

    duration: number;

    instructions?: string;
  }[];
};

export async function updatePrescription(input: UpdatePrescriptionInput) {
  await requirePermission("consultations.manage");

  const prescription = await prescriptionService.updatePrescription(
    input.consultationId,
    input.prescriptionId,
    input.medicines,
  );

  revalidatePath(`/doctors/consultations/${input.consultationId}`);

  return prescription;
}
