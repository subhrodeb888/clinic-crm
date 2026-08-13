import { z } from "zod";

const appointmentStatuses = [
  "scheduled",
  "confirmed",
  "checked_in",
  "in_consultation",
  "completed",
  "cancelled",
  "no_show",
] as const;

const queueStatuses = [
  "waiting",
  "checked_in",
  "in_consultation",
  "completed",
] as const;

export const createAppointmentSchema = z.object({
  patientId: z.string().min(1, "Patient is required"),

doctorId: z.string().min(1, "Doctor is required"),

  appointmentDate: z.string().min(1, "Appointment date is required"),

  appointmentTime: z.string().min(1, "Appointment time is required"),

  reason: z.string().optional(),

  notes: z.string().optional(),
});

export const updateAppointmentSchema = createAppointmentSchema
  .partial()
  .extend({
    status: z.enum(appointmentStatuses).optional(),

    queueStatus: z.enum(queueStatuses).optional(),
  });

export const appointmentSearchSchema = z.object({
  query: z.string().optional(),

  doctorId: z.string().optional(),

  patientId: z.string().optional(),

  status: z.enum(appointmentStatuses).optional(),

  queueStatus: z.enum(queueStatuses).optional(),

  appointmentDate: z.string().optional(),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;

export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>;

export type AppointmentSearchInput = z.infer<typeof appointmentSearchSchema>;
