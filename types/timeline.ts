export type TimelineEventType =
  | "appointment_booked"
  | "prescription_added"
  | "invoice_generated"
  | "reminder_sent"
  | "consultation_completed";

export type TimelineEvent = {
  id: string;

  type: TimelineEventType;

  title: string;

  description?: string;

  timestamp: string;

  performedBy?: string;

  status?: "success" | "warning" | "info";

  expandable?: boolean;
};
