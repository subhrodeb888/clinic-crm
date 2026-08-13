"use server";

import { requirePermission } from "@/lib/auth/guards";
import { patientTimelineService } from "@/services/patient-timeline.service";

export async function getPatientTimeline(patientId: string) {
  await requirePermission("patients.read");

  return patientTimelineService.getPatientTimeline(patientId);
}
