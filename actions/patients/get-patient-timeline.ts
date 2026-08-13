"use server";

import { requirePermission } from "@/lib/auth/guards";
import { activityRepository } from "@/repositories/activity.repository";

export async function getPatientTimeline(patientId: string) {
  await requirePermission("patients.read");

  return activityRepository.getPatientLogs(patientId);
}
