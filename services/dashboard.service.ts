import { appointmentService } from "@/services/appointment.service";
import { invoiceService } from "@/services/invoice.service";
import { doctorService } from "@/services/doctor.service";

export class DashboardService {
  async getMetrics() {
    const appointments = await appointmentService.getAppointments();

    const invoices = await invoiceService.getInvoices();

    const outstandingBalance = invoices
      .filter(
        (invoice) =>
          invoice.status === "pending" || invoice.status === "partial",
      )
      .reduce((sum, invoice) => sum + invoice.total, 0);

    const today = new Date().toISOString().split("T")[0];

    const appointmentsToday = appointments.filter(
      (appointment) => appointment.appointmentDate === today,
    ).length;

    const checkedInPatients = appointments.filter(
      (appointment) => appointment.status === "checked_in",
    ).length;

    const revenueToday = invoices
      .filter((invoice) => invoice.issuedAt === today)
      .reduce((sum, invoice) => sum + invoice.total, 0);

    return {
      appointmentsToday,
      checkedInPatients,
      revenueToday,
      outstandingBalance,
    };
  }

  async getAppointmentStatusDistribution() {
    const appointments = await appointmentService.getAppointments();

    const statusCounts = new Map<string, number>();

    for (const appointment of appointments) {
      const status = appointment.status;

      statusCounts.set(status, (statusCounts.get(status) ?? 0) + 1);
    }

    const total = appointments.length;

    return Array.from(statusCounts.entries()).map(([name, count]) => ({
      name,

      value: total === 0 ? 0 : Math.round((count / total) * 100),
    }));
  }

  async getRecentActivity() {
    const appointments = await appointmentService.getAppointments();

    const invoices = await invoiceService.getInvoices();

    const activities = [
      ...appointments.slice(0, 5).map((appointment) => ({
        id: appointment.id,

        text: `${appointment.patient.firstName} ${appointment.patient.lastName} booked an appointment`,

        time: appointment.createdAt,
      })),

      ...invoices.slice(0, 5).map((invoice) => ({
        id: invoice.id,

        text: `Invoice for ${invoice.patient.firstName} ${invoice.patient.lastName} marked as ${invoice.status}`,

        time: invoice.issuedAt,
      })),
    ];

    return activities
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 10);
  }

  async getOperationalOverview() {
    const appointments = await appointmentService.getAppointments();

    const waitingPatients = appointments.filter(
      (appointment) => appointment.queueStatus === "waiting",
    ).length;

    const completedConsultations = appointments.filter(
      (appointment) => appointment.status === "completed",
    ).length;

    const doctorsAvailable = (await doctorService.getDoctors()).length;

    return {
      waitingPatients,
      doctorsAvailable,
      completedConsultations,
    };
  }
}

export const dashboardService = new DashboardService();
