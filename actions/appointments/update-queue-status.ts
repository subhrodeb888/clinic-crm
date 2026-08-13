"use server";

import { revalidatePath } from "next/cache";

import { requirePermission } from "@/lib/auth/guards";
import { appointmentService } from "@/services/appointment.service";

export async function updateQueueStatus(
  appointmentId: string,
  queueStatus: "waiting" | "checked_in" | "in_consultation" | "completed",
) {
  await requirePermission("appointments.manage");

  const appointment = await appointmentService.changeQueueStatus(
    appointmentId,
    queueStatus,
  );

  revalidatePath("/appointments");

  revalidatePath("/queue");

  return appointment;
}
