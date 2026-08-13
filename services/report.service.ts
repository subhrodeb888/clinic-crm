import { patientService } from "@/services/patient.service";
import { appointmentService } from "@/services/appointment.service";
import { invoiceService } from "@/services/invoice.service";

export class ReportService {
  async getMetrics() {
    const patients = await patientService.getPatients();

    const appointments = await appointmentService.getAppointments();

    const invoices = await invoiceService.getInvoices();

    const totalRevenue = invoices.reduce(
      (sum, invoice) => sum + invoice.total,
      0,
    );

    const totalAppointments = appointments.length;

    const noShows = appointments.filter(
      (appointment) => appointment.status === "no_show",
    ).length;

    const noShowRate =
      totalAppointments === 0
        ? "0%"
        : `${Math.round((noShows / totalAppointments) * 100)}%`;

    const activePatients = patients.length;

    return {
      totalRevenue,
      totalAppointments,
      noShowRate,
      activePatients,
    };
  }

  async getRevenueTrend() {
    const invoices = await invoiceService.getInvoices();

    const monthlyRevenue = new Map<string, number>();

    for (const invoice of invoices) {
      const month = new Date(invoice.issuedAt).toLocaleString("en-US", {
        month: "short",
      });

      monthlyRevenue.set(
        month,
        (monthlyRevenue.get(month) ?? 0) + invoice.total,
      );
    }

    return Array.from(monthlyRevenue.entries()).map(([month, revenue]) => ({
      month,
      revenue,
    }));
  }

  async getAppointmentAnalytics() {
    const appointments = await appointmentService.getAppointments();

    const monthlyAppointments = new Map<string, number>();

    for (const appointment of appointments) {
      const month = new Date(appointment.appointmentDate).toLocaleString(
        "en-US",
        {
          month: "short",
        },
      );

      monthlyAppointments.set(month, (monthlyAppointments.get(month) ?? 0) + 1);
    }

    return Array.from(monthlyAppointments.entries()).map(
      ([month, appointments]) => ({
        month,
        appointments,
      }),
    );
  }

  async getNoShowAnalytics() {
    const appointments = await appointmentService.getAppointments();

    const noShowCount = appointments.filter(
      (appointment) => appointment.status === "no_show",
    ).length;

    const attendedCount = appointments.length - noShowCount;

    return [
      {
        name: "Attended",
        value: attendedCount,
      },
      {
        name: "No Show",
        value: noShowCount,
      },
    ];
  }

  // services/report.service.ts

  async getPatientGrowth() {
    const patients = await patientService.getPatients();

    const monthlyPatients = new Map<string, number>();

    for (const patient of patients) {
      const month = new Date(patient.createdAt).toLocaleString("en-US", {
        month: "short",
      });

      monthlyPatients.set(month, (monthlyPatients.get(month) ?? 0) + 1);
    }

    return Array.from(monthlyPatients.entries()).map(([month, patients]) => ({
      month,
      patients,
    }));
  }

  async getDoctorPerformance() {
    const appointments = await appointmentService.getAppointments();

    const doctorStats = new Map<string, number>();

    for (const appointment of appointments) {
      if (appointment.status !== "completed") {
        continue;
      }

      const doctorName = appointment.doctor.name;

      doctorStats.set(doctorName, (doctorStats.get(doctorName) ?? 0) + 1);
    }

    return Array.from(doctorStats.entries()).map(([doctor, consultations]) => ({
      doctor,
      consultations,
    }));
  }
}

export const reportService = new ReportService();
