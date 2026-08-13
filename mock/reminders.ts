import { Reminder } from "@/types/reminder";

export const reminders: Reminder[] = [
  {
    id: "r1",

    patientId: "p1",

    type: "appointment",

    message: "Reminder for your appointment tomorrow at 10 AM.",

    status: "sent",

    scheduledFor: "2026-05-14T18:00:00",

    sentAt: "2026-05-14T18:01:00",
  },
];
