export type Gender = "male" | "female" | "other";

export type PatientStatus = "active" | "inactive" | "follow_up" | "high_risk";

export type BloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

export type Patient = {
  id: string;

  /* BASIC INFO */

  firstName: string;

  lastName: string;

  phone: string;

  email?: string;

  gender: Gender;

  dateOfBirth: string;

  /* MEDICAL */

  bloodGroup?: BloodGroup;

  notes?: string;

  /* CONTACT */

  address?: string;

  emergencyContact?: string;

  /* OPERATIONAL */

  lastVisit?: string;

  assignedDoctor?: string;

  assignedDoctorId?: string;

  balance: number;

  status: PatientStatus;

  /* SYSTEM */

  createdAt: string;
};
