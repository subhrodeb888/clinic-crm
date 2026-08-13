"use server";

import { requireAuth } from "@/lib/auth/guards";
import { reportService } from "@/services/report.service";

export async function getAppointmentTrendData() {
  await requireAuth();

  return reportService.getAppointmentAnalytics();
}
