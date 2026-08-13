import { z } from "zod";

export const createPrescriptionSchema = z.object({
  consultationId: z.uuid(),

  appointmentId: z.uuid(),

  medicines: z
    .array(
      z.object({
        medicine: z.string().min(1, "Medicine is required"),

        dosage: z.string().min(1, "Dosage is required"),

        frequency: z.string().min(1, "Frequency is required"),

        duration: z.number().int().positive(),

        instructions: z.string().optional(),
      }),
    )
    .min(1, "At least one medicine is required"),
});

export type CreatePrescriptionInput = z.infer<typeof createPrescriptionSchema>;
