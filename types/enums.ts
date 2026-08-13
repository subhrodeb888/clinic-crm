export type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "checked_in"
  | "in_consultation"
  | "completed"
  | "cancelled"
  | "no_show";

export type InvoiceStatus = "paid" | "pending" | "partial" | "refunded";

export type ReminderStatus = "sent" | "pending" | "failed";

export type UserRole = "admin" | "doctor" | "receptionist";

export type QueueStatus =
  | "waiting"
  | "checked_in"
  | "in_consultation"
  | "completed";
