import { BloodGroup, Gender, Patient, PatientStatus } from "@/types/patient";

type PatientMapperInput = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string | null;
  gender: string;
  dateOfBirth?: string | Date | null;
  bloodGroup?: string | null;
  notes?: string | null;
  address?: string | null;
  emergencyContact?: string | null;
  lastVisit?: string | Date | null;
  assignedDoctor?: string | null;
  assignedDoctorId?: string | null;
  balance?: string | number | null;
  status: string;
  createdAt: string | Date;
};

export function mapPatientToUI(patient: PatientMapperInput): Patient {
  return {
    id: patient.id,

    firstName: patient.firstName,
    lastName: patient.lastName,

    phone: patient.phone,

    email: patient.email ?? undefined,

    gender: patient.gender as Gender,

    dateOfBirth: patient.dateOfBirth?.toString() ?? "",

    bloodGroup: (patient.bloodGroup as BloodGroup | null) ?? undefined,

    notes: patient.notes ?? undefined,

    address: patient.address ?? undefined,

    emergencyContact: patient.emergencyContact ?? undefined,

    lastVisit: patient.lastVisit
      ? new Date(patient.lastVisit).toISOString().split("T")[0]
      : undefined,

    assignedDoctor: patient.assignedDoctor ?? undefined,

    assignedDoctorId: patient.assignedDoctorId ?? undefined,

    balance: Number(patient.balance ?? 0),

    status: patient.status as PatientStatus,

    createdAt: new Date(patient.createdAt).toISOString().split("T")[0],
  };
}
