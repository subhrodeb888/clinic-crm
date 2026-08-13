"use server";

import { requirePermission } from "@/lib/auth/guards";
import { appointmentService } from "@/services/appointment.service";

import type { AppointmentStatus } from "@/types/enums";

export async function getAppointments(
  doctorId?: string,
  status?: AppointmentStatus,
) {
  await requirePermission("appointments.read");

  return appointmentService.getAppointments(undefined, undefined, doctorId, status);
}
