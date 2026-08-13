import { Appointment } from "@/types/appointment";

export function mapAppointmentToCalendarEvent(appointment: Appointment) {
  const start = new Date(
    `${appointment.appointmentDate}T${appointment.startTime}`,
  );

  const end = new Date(`${appointment.appointmentDate}T${appointment.endTime}`);

  return {
    id: appointment.id,

    title: `${appointment.patient.firstName} ${appointment.patient.lastName}`,

    start,

    end,

    resource: appointment,
  };
}
