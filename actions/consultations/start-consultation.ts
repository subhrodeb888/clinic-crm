"use server";

import { revalidatePath } from "next/cache";

import { requirePermission } from "@/lib/auth/guards";
import { appointmentService } from "@/services/appointment.service";

export async function startConsultation(appointmentId: string) {
  await requirePermission("consultations.manage");

  const appointment = await appointmentService.getAppointment(appointmentId);

  if (appointment.queueStatus !== "checked_in") {
    return appointment;
  }

  const updatedAppointment = await appointmentService.changeQueueStatus(
    appointmentId,
    "in_consultation",
  );

  revalidatePath("/appointments");
  revalidatePath("/queue");
  revalidatePath("/doctors");
  revalidatePath(`/doctors/consultations/${appointmentId}`);

  return updatedAppointment;
}
