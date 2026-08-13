"use server";

import { requirePermission } from "@/lib/auth/guards";
import { consultationService } from "@/services/consultation.service";

export async function getConsultationByAppointment(appointmentId: string) {
  await requirePermission("consultations.manage");

  return consultationService.getConsultationByAppointment(appointmentId);
}
