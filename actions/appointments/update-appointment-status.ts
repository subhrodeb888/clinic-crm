"use server";

import { revalidatePath } from "next/cache";

import { requirePermission } from "@/lib/auth/guards";
import { appointmentService } from "@/services/appointment.service";

export async function updateAppointmentStatus(
  appointmentId: string,
  status: string,
) {
  await requirePermission("appointments.manage");

  const appointment = await appointmentService.updateAppointmentStatus(
    appointmentId,
    status,
  );

  revalidatePath("/appointments");

  return appointment;
}
