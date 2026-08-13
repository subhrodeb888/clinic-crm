"use server";

import { getCurrentDoctor } from "./get-current-doctor";
import { doctorDashboardService } from "@/services/doctor-dashboard.service";

export async function getQueueSummary() {
  const doctor = await getCurrentDoctor();

  return doctorDashboardService.getQueueSummary(doctor.id);
}
