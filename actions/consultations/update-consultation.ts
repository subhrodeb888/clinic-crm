"use server";

import { revalidatePath } from "next/cache";

import { consultationService } from "@/services/consultation.service";

import { requirePermission } from "@/lib/auth/guards";

type UpdateConsultationInput = {
  id: string;

  chiefComplaint?: string;

  diagnosis?: string;

  notes?: string;

  aiSummary?: string;
};

export async function updateConsultation(input: UpdateConsultationInput) {
  await requirePermission("consultations.manage");

  const consultation = await consultationService.updateConsultation(
    input.id,
    input,
  );

  revalidatePath("/doctors/consultations");

  return consultation;
}
