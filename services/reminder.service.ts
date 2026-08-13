import { reminderRepository } from "@/repositories/reminder.repository";

import { mapReminderToUI } from "./mappers/reminder.mapper";

export class ReminderService {
  async getReminders() {
    const reminders = await reminderRepository.getReminders();

    return reminders.map(mapReminderToUI);
  }

  async getMetrics() {
    const reminders = await reminderRepository.getReminders();

    const sentToday = reminders.filter((reminder) => reminder.sent).length;

    const pending = reminders.filter((reminder) => !reminder.sent).length;

    const failed = 0;

    const followUpsDue = reminders.filter((reminder) => !reminder.sent).length;

    return {
      sentToday,
      pending,
      failed,
      followUpsDue,
    };
  }
}

export const reminderService = new ReminderService();
