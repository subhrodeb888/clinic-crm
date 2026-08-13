import { z } from "zod";

export const createConsultationSchema = z.object({
  patientId: z.uuid(),

  doctorId: z.uuid(),

  appointmentId: z.uuid().optional(),

  chiefComplaint: z.string().optional(),

  diagnosis: z.string().optional(),

  notes: z.string().optional(),

  aiSummary: z.string().optional(),
});

export type CreateConsultationInput = z.infer<typeof createConsultationSchema>;
