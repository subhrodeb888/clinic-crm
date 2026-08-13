import { appointments } from "@/mock/appointments";

export const calendarEvents = appointments.map((appointment) => ({
  id: appointment.id,

  title: `${appointment.patient.firstName} ${appointment.patient.lastName}`,

  start: new Date(`${appointment.appointmentDate}T10:00:00`),

  end: new Date(`${appointment.appointmentDate}T10:30:00`),

  resource: appointment,
}));
