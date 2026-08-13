import { Appointment } from "@/types/appointment";

export function groupAppointmentsByStatus(appointments: Appointment[]) {
  return {
    waiting: appointments.filter(
      (appointment) => appointment.queueStatus === "waiting",
    ),

    checked_in: appointments.filter(
      (appointment) => appointment.queueStatus === "checked_in",
    ),

    in_consultation: appointments.filter(
      (appointment) => appointment.queueStatus === "in_consultation",
    ),

    completed: appointments.filter(
      (appointment) => appointment.queueStatus === "completed",
    ),
  };
}
