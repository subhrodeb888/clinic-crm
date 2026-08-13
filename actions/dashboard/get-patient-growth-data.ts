"use server";

import { requireAuth } from "@/lib/auth/guards";
import { reportService } from "@/services/report.service";

export async function getPatientGrowthData() {
  await requireAuth();

  return reportService.getPatientGrowth();
}
