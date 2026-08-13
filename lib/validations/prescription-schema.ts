import { z } from "zod";

export const medicineSchema = z.object({
  medicine: z.string().min(1, "Medicine is required"),

  dosage: z.string().min(1, "Dosage is required"),

  frequency: z.string().min(1, "Frequency is required"),

  duration: z.string().min(1, "Duration is required"),

  instructions: z.string(),
});

export const prescriptionSchema = z.object({
  medicines: z.array(medicineSchema).min(1, "Add at least one medicine"),
});

export type PrescriptionSchema = z.infer<typeof prescriptionSchema>;
