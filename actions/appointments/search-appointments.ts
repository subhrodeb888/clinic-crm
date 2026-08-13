"use server";

import {
  type AppointmentSearchInput,
} from "@/validations/appointment.schema";

import { requirePermission } from "@/lib/auth/guards";
import { appointmentService } from "@/services/appointment.service";

export async function searchAppointments(
  filters: AppointmentSearchInput
) {
  await requirePermission("appointments.read");

  return appointmentService.searchAppointments(
    filters
  );
}