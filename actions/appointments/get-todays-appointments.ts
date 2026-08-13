"use server";

import { requirePermission } from "@/lib/auth/guards";
import { appointmentService } from "@/services/appointment.service";

export async function getTodaysAppointments() {
  await requirePermission("appointments.read");

  return appointmentService.getTodaysAppointments();
}
