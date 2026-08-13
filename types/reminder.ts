import { ReminderStatus } from "./enums";

export type Reminder = {
  id: string;

  patientId: string;

  patient?: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
  };

  type: "appointment" | "follow_up" | "payment";

  message: string;

  status: ReminderStatus;

  scheduledFor: string;

  sentAt?: string;
};
