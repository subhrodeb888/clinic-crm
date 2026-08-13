import { appointments } from "@/mock/appointments";
import { invoices } from "@/mock/invoices";

export function getDashboardMetrics() {
  const appointmentsToday = appointments.length;

  const checkedInPatients = appointments.filter(
    (appointment) => appointment.status === "checked_in",
  ).length;

  const revenueToday = invoices.reduce(
    (total, invoice) => total + invoice.total,
    0,
  );

  const pendingPayments = invoices.filter(
    (invoice) => invoice.status === "pending",
  ).length;

  return {
    appointmentsToday,
    checkedInPatients,
    revenueToday,
    pendingPayments,
  };
}
