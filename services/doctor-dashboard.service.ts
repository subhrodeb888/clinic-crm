import { appointmentService } from "@/services/appointment.service";

export class DoctorDashboardService {
  async getMetrics(doctorId: string) {
    const activeAppointments =
      await appointmentService.getTodaysAppointments(doctorId);

    const allAppointments = await appointmentService.getAppointments(
      undefined,
      undefined,
      doctorId,
    );

    const todaysAppointments = activeAppointments.length;

    const completedConsultations = allAppointments.filter(
      (appointment) => appointment.status === "completed",
    ).length;

    const queueWaiting = activeAppointments.filter(
      (appointment) => appointment.queueStatus === "waiting",
    ).length;

    return {
      todaysAppointments,
      completedConsultations,
      queueWaiting,
    };
  }

  async getTodaysPatients(doctorId: string) {
    const appointments =
      await appointmentService.getTodaysAppointments(doctorId);

    return appointments.map((appointment) => ({
      appointmentId: appointment.id,
      patientName: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
      reason: appointment.reason ?? "General Consultation",
      startTime: appointment.startTime,
      queueStatus: appointment.queueStatus ?? "waiting",
    }));
  }

  async getQueueSummary(doctorId: string) {
    const appointments =
      await appointmentService.getTodaysAppointments(doctorId);

    const waiting = appointments.filter(
      (appointment) => appointment.queueStatus === "waiting",
    ).length;

    const checkedIn = appointments.filter(
      (appointment) => appointment.queueStatus === "checked_in",
    ).length;

    const inConsultation = appointments.filter(
      (appointment) => appointment.queueStatus === "in_consultation",
    ).length;

    return [
      {
        label: "Waiting",
        value: waiting,
      },

      {
        label: "Checked In",
        value: checkedIn,
      },

      {
        label: "In Consultation",
        value: inConsultation,
      },
    ];
  }

  async getRecentConsultations(doctorId: string) {
    const appointments = await appointmentService.getAppointments(
      undefined,
      undefined,
      doctorId,
    );

    return appointments
      .filter((appointment) => appointment.status === "completed")
      .slice(0, 4)
      .map((appointment) => ({
        id: appointment.id,

        patientName: `${appointment.patient.firstName} ${appointment.patient.lastName}`,

        reason: appointment.reason ?? "General Consultation",
      }));
  }
}

export const doctorDashboardService = new DoctorDashboardService();
