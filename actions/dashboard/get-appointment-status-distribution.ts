"use server";

import { requireAuth } from "@/lib/auth/guards";
import { dashboardService } from "@/services/dashboard.service";

export async function getAppointmentStatusDistribution() {
  await requireAuth();

  return dashboardService.getAppointmentStatusDistribution();
}
