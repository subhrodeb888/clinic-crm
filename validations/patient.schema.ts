import { z } from "zod";

export const genderSchema = z.enum(["male", "female", "other"]);

export const bloodGroupSchema = z.enum([
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
]);

export const patientStatusSchema = z.enum([
  "active",
  "inactive",
  "follow_up",
  "high_risk",
]);

export const createPatientSchema = z.object({
  firstName: z.string().trim().min(2).max(100),

  lastName: z.string().trim().min(2).max(100),

  phone: z.string().trim().min(10).max(20),

  email: z.email().optional().or(z.literal("")),

  gender: genderSchema,

  dateOfBirth: z.iso.date(),

  bloodGroup: bloodGroupSchema.optional(),

  address: z.string().trim().max(500).optional().or(z.literal("")),

  emergencyContact: z.string().trim().max(20).optional().or(z.literal("")),

  notes: z.string().trim().max(5000).optional().or(z.literal("")),

  assignedDoctorId: z.uuid().optional().nullable(),

  status: patientStatusSchema,
});

export const updatePatientSchema = createPatientSchema.partial();

export const patientSearchSchema = z.object({
  query: z.string().trim().max(100).optional(),

  status: patientStatusSchema.optional(),

  assignedDoctorId: z.uuid().optional(),
});

export type CreatePatientInput = z.infer<typeof createPatientSchema>;

export type UpdatePatientInput = z.infer<typeof updatePatientSchema>;

export type PatientSearchInput = z.infer<typeof patientSearchSchema>;
