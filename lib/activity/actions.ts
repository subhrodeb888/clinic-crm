export const ACTIVITY_ACTIONS = {
  PATIENT_CREATED: "patient_created",

  PATIENT_UPDATED: "patient_updated",

  PATIENT_DELETED: "patient_deleted",

  DOCTOR_ASSIGNED: "doctor_assigned",

  PATIENT_STATUS_CHANGED: "patient_status_changed",

  APPOINTMENT_CREATED: "appointment_created",
  APPOINTMENT_UPDATED: "appointment_updated",
  APPOINTMENT_CANCELLED: "appointment_cancelled",
  APPOINTMENT_STATUS_CHANGED: "appointment_status_changed",
  QUEUE_STATUS_CHANGED: "queue_status_changed",
} as const;
