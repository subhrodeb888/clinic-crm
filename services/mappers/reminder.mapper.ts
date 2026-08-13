import { Reminder } from "@/types/reminder";

type ReminderMapperInput = {
  id: string;
  patientId: string;
  patient?: Reminder["patient"] | null;
  message?: string | null;
  scheduledFor: string | Date;
  sent: boolean;
};

export function mapReminderToUI(reminder: ReminderMapperInput): Reminder {
  return {
    id: reminder.id,

    patientId: reminder.patientId,

    patient: reminder.patient ?? undefined,

    type: "appointment",

    message: reminder.message ?? "",

    status: reminder.sent ? "sent" : "pending",

    scheduledFor:
      reminder.scheduledFor instanceof Date
        ? reminder.scheduledFor.toISOString().split("T")[0]
        : reminder.scheduledFor,

    sentAt: reminder.sent
      ? reminder.scheduledFor instanceof Date
        ? reminder.scheduledFor.toISOString().split("T")[0]
        : reminder.scheduledFor
      : undefined,
  };
}
