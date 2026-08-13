"use server";

import { revalidatePath } from "next/cache";

import {
  updateAppointmentSchema,
  type UpdateAppointmentInput,
} from "@/validations/appointment.schema";

import { requirePermission } from "@/lib/auth/guards";
import { appointmentService } from "@/services/appointment.service";

export async function updateAppointment(
  id: string,
  input: UpdateAppointmentInput
) {
  await requirePermission("appointments.manage");

  const validated =
    updateAppointmentSchema.parse(input);

  const appointment =
    await appointmentService.updateAppointment(
      id,
      validated
    );

  revalidatePath("/appointments");

  revalidatePath(
    `/appointments/${id}`
  );

  return appointment;
}