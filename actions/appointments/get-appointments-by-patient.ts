"use server";

import { requirePermission } from "@/lib/auth/guards";
import { appointmentService } from "@/services/appointment.service";

export async function getAppointmentsByPatient(patientId: string) {
  await requirePermission("patients.read");

  return appointmentService.getAppointmentsByPatient(patientId);
}
