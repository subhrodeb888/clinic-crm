import { Doctor } from "@/types/doctor";

type DoctorMapperInput = {
  id: string;
  name?: string | null;
  specialization?: string | null;
  phone?: string | null;
  email?: string | null;
};

export function mapDoctorToUI(doctor: DoctorMapperInput): Doctor {
  const name = (doctor.name ?? "").replace(/^Dr\.\s*/i, "");

  const parts = name.trim().split(" ");

  return {
    id: doctor.id,

    firstName: parts[0] ?? "",

    lastName: parts.slice(1).join(" "),

    specialization: doctor.specialization ?? "",

    phone: doctor.phone ?? undefined,

    email: doctor.email ?? undefined,

    availableToday: true,
  };
}
