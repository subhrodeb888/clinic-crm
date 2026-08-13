"use server";

import { revalidatePath } from "next/cache";

import {
  createAppointmentSchema,
  type CreateAppointmentInput,
} from "@/validations/appointment.schema";

import { requirePermission } from "@/lib/auth/guards";
import { appointmentService } from "@/services/appointment.service";

export async function createAppointment(input: CreateAppointmentInput) {
  await requirePermission("appointments.manage");

  const validated = createAppointmentSchema.parse(input);

  const appointment = await appointmentService.createAppointment(validated);

  revalidatePath("/appointments");

  return appointment;
}
