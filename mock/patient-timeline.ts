import { TimelineEvent } from "@/types/timeline";

export const patientTimeline: TimelineEvent[] = [
  {
    id: "1",

    type: "appointment_booked",

    title: "Appointment Booked",

    description:
      "Appointment scheduled with Dr. Amit Roy for cardiology consultation.",

    timestamp: "2026-05-28T09:00:00",

    performedBy: "Reception",

    status: "info",
  },

  {
    id: "2",

    type: "reminder_sent",

    title: "Reminder Sent",

    description: "WhatsApp reminder sent successfully to patient.",

    timestamp: "2026-05-28T10:00:00",

    performedBy: "Automation System",

    status: "success",
  },

  {
    id: "3",

    type: "consultation_completed",

    title: "Consultation Completed",

    description: "Doctor completed consultation and updated patient notes.",

    timestamp: "2026-05-27T14:00:00",

    performedBy: "Dr. Amit Roy",

    status: "success",

    expandable: true,
  },

  {
    id: "4",

    type: "invoice_generated",

    title: "Invoice Generated",

    description: "Invoice INV-1004 generated for consultation charges.",

    timestamp: "2026-05-27T15:00:00",

    performedBy: "Billing Desk",

    status: "warning",
  },

  {
    id: "5",

    type: "prescription_added",

    title: "Prescription Added",

    description: "Blood pressure medication prescribed for 30 days.",

    timestamp: "2026-05-26T11:30:00",

    performedBy: "Dr. Priya Sen",

    status: "info",

    expandable: true,
  },
];
