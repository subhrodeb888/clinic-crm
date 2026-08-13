"use server";

import { requireAuth } from "@/lib/auth/guards";
import { reportService } from "@/services/report.service";

export async function getRevenueChartData() {
  await requireAuth();

  return reportService.getRevenueTrend();
}
