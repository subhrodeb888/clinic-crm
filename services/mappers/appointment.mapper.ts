import type { Appointment } from "@/types/appointment";
import type { Doctor } from "@/types/doctor";
import type { Patient } from "@/types/patient";

// The repository's LEFT JOIN can yield `null` for patient/doctor when an
// appointment references a row that no longer exists (the appointments table
// has no foreign-key cascade). The mapper input therefore treats both as
// nullable, and normalizes them into always-present objects on the way out so
// the `Appointment` type’s non-null `patient`/`doctor` stay accurate for every
// consumer (table columns, details drawer, calendar, queue).
type AppointmentMapperInput = {
  appointmentDate: string | Date;
  createdAt: string | Date;
  patient?: {
    id?: string;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
  } | null;
  doctor?: {
    name?: string | null;
    specialization?: string | null;
  } | null;
};

type MappedAppointment = Appointment & {
  doctor: Doctor & { name: string };
};

/**
 * Builds a minimal, always-present patient placeholder so a missing patient
 * renders as "Unknown patient" instead of crashing the UI.
 */
function toSafePatient(
  patient: NonNullable<AppointmentMapperInput["patient"]> | null | undefined,
): Patient {
  return {
    id: patient?.id ?? "",
    firstName: patient?.firstName ?? "Unknown",
    lastName: patient?.lastName ?? "patient",
    phone: patient?.phone ?? "—",
    gender: "other",
    dateOfBirth: "",
    balance: 0,
    status: "inactive",
    createdAt: "",
  };
}

export function mapAppointmentToUI<TAppointment extends AppointmentMapperInput>(
  appointment: TAppointment,
): MappedAppointment {
  const doctorName = appointment.doctor?.name ?? "";
  const cleanDoctorName = doctorName.replace(/^Dr\.\s*/i, "");
  const [firstName, ...lastNameParts] = cleanDoctorName.split(" ");

  const doctor: Doctor & { name: string } = {
    ...appointment.doctor,
    name: appointment.doctor?.name ?? "",
    firstName: firstName || "Unknown",
    lastName: lastNameParts.join(" ") || "Doctor",
    specialization: appointment.doctor?.specialization ?? "General",
  } as Doctor & { name: string };

  return {
    ...appointment,

    appointmentDate:
      appointment.appointmentDate instanceof Date
        ? appointment.appointmentDate.toISOString().split("T")[0]
        : appointment.appointmentDate,

    createdAt:
      appointment.createdAt instanceof Date
        ? appointment.createdAt.toISOString().split("T")[0]
        : appointment.createdAt,

    patient: toSafePatient(appointment.patient),

    doctor,
  } as unknown as MappedAppointment;
}
