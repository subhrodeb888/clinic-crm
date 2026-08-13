import { z } from "zod";

import { genderSchema } from "@/validations/patient.schema";

export const createPatientApiSchema = z.object({
  firstName: z.string().trim().min(2).max(100),

  lastName: z.string().trim().min(2).max(100),

  phone: z.string().trim().min(10).max(20),

  email: z.email().optional().or(z.literal("")),

  gender: genderSchema,

  dateOfBirth: z.iso.date(),
});

export type CreatePatientApiInput = z.infer<typeof createPatientApiSchema>;
