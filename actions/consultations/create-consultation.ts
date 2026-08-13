"use server";

import { revalidatePath } from "next/cache";

import { consultationService } from "@/services/consultation.service";
import { appointmentService } from "@/services/appointment.service";

import { requirePermission } from "@/lib/auth/guards";

import {
  createConsultationSchema,
  type CreateConsultationInput,
} from "@/validations/consultation.schema";

export async function createConsultation(input: CreateConsultationInput) {
  await requirePermission("consultations.manage");

  const data = createConsultationSchema.parse(input);

  const consultation = await consultationService.createConsultation(data);

  if (data.appointmentId) {
    await appointmentService.changeQueueStatus(
      data.appointmentId,
      "in_consultation",
    );

    revalidatePath(`/doctors/consultations/${data.appointmentId}`);
    revalidatePath("/appointments");
    revalidatePath("/queue");
  }

  return consultation;
}
