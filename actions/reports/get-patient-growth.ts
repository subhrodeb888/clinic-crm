"use server";

import { requireRole } from "@/lib/auth/guards";
import { reportService } from "@/services/report.service";

export async function getPatientGrowth() {
  await requireRole("admin");

  return reportService.getPatientGrowth();
}