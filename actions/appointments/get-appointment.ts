"use server";

import { requirePermission } from "@/lib/auth/guards";
import { appointmentService } from "@/services/appointment.service";

export async function getAppointment(id: string) {
  await requirePermission("appointments.read");

  return appointmentService.getAppointment(id);
}
