import { desc, eq } from "drizzle-orm";

import { db } from "@/db";

import { reminders, patients } from "@/db/schema";

export class ReminderRepository {
  async getReminders() {
    return db
      .select({
        id: reminders.id,

        patientId: reminders.patientId,

        title: reminders.title,

        message: reminders.message,

        scheduledFor: reminders.scheduledFor,

        sent: reminders.sent,

        createdAt: reminders.createdAt,

        patient: {
          id: patients.id,
          firstName: patients.firstName,
          lastName: patients.lastName,
          phone: patients.phone,
        },
      })
      .from(reminders)
      .leftJoin(patients, eq(reminders.patientId, patients.id))
      .orderBy(desc(reminders.scheduledFor));
  }
}

export const reminderRepository = new ReminderRepository();
