"use server";

import { revalidatePath } from "next/cache";

import { requirePermission } from "@/lib/auth/guards";
import { completeConsultation } from "./complete-consultation";

import { updateQueueStatus } from "@/actions/appointments/update-queue-status";
import { updateAppointmentStatus } from "@/actions/appointments/update-appointment-status";

export async function finishConsultation(
  consultationId: string,
  appointmentId: string,
  patientId: string,
) {
  await requirePermission("consultations.manage");

  await completeConsultation(consultationId);

  await updateAppointmentStatus(appointmentId, "completed");

  await updateQueueStatus(appointmentId, "completed");

  revalidatePath("/doctors");

  revalidatePath("/appointments");

  revalidatePath("/queue");

  revalidatePath(`/patients/${patientId}`);

  revalidatePath(`/doctors/consultations/${appointmentId}`);

  return {
    success: true,
  };
}
