"use server";

import { requireAuth } from "@/lib/auth/guards";
import { dashboardService } from "@/services/dashboard.service";

export async function getDashboardMetrics() {
  await requireAuth();

  return dashboardService.getMetrics();
}
