"use server";

import { requirePermission } from "@/lib/auth/guards";
import { consultationService } from "@/services/consultation.service";

export async function completeConsultation(consultationId: string) {
  await requirePermission("consultations.manage");

  return consultationService.completeConsultation(consultationId);
}
