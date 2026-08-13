import type { Appointment } from "@/types/appointment";

type AppointmentMapperInput = {
  appointmentDate: string | Date;
  createdAt: string | Date;
  doctor?: {
    name?: string | null;
  } | null;
};

type MappedAppointment = Appointment & {
  doctor: Appointment["doctor"] & {
    name: string;
  };
};

export function mapAppointmentToUI<TAppointment extends AppointmentMapperInput>(
  appointment: TAppointment,
): MappedAppointment {
  const doctorName = appointment.doctor?.name ?? "";

  const cleanDoctorName = doctorName.replace(/^Dr\.\s*/i, "");

  const [firstName, ...lastNameParts] = cleanDoctorName.split(" ");

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

    doctor: {
      ...appointment.doctor,

      firstName: firstName ?? "",

      lastName: lastNameParts.join(" "),
    },
  } as unknown as MappedAppointment;
}
