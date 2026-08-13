"use server";

import { requireAuth } from "@/lib/auth/guards";
import { dashboardService } from "@/services/dashboard.service";

export async function getRecentActivity() {
  await requireAuth();

  return dashboardService.getRecentActivity();
}
