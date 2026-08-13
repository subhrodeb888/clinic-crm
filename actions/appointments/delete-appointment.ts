"use server";

import { revalidatePath } from "next/cache";

import { requirePermission } from "@/lib/auth/guards";
import { appointmentService } from "@/services/appointment.service";

export async function deleteAppointment(id: string) {
  await requirePermission("appointments.manage");

  const appointment = await appointmentService.deleteAppointment(id);

  revalidatePath("/appointments");

  return appointment;
}
