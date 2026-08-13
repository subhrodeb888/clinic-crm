"use server";

import { requirePermission } from "@/lib/auth/guards";
import { reminderService } from "@/services/reminder.service";

export async function getReminderMetrics() {
  await requirePermission("reminders.manage");

  return reminderService.getMetrics();
}