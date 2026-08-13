import { Suspense } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageContainer } from "@/components/layout/page-container";
import { AppointmentsViewSwitcher } from "@/features/appointments/components/appointments-view-switcher";
import { AppointmentsFilters } from "@/features/appointments/components/appointments-filters";
import { AppointmentsCalendar } from "@/features/appointments/components/appointments-calendar";
import { getAppointments } from "@/actions/appointments/get-appointments";
import { getDoctors } from "@/actions/doctors/get-doctors";
import { getPatients } from "@/actions/patients/get-patients";
import { APPOINTMENT_STATUSES } from "@/features/appointments/constants";
import { AppointmentStatus } from "@/types/enums";

type PageProps = {
  searchParams: Promise<{
    doctor?: string | string[];
    status?: string | string[];
  }>;
};

export default async function AppointmentsCalendarPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  const doctorId =
    typeof params.doctor === "string" ? params.doctor : undefined;

  const status = APPOINTMENT_STATUSES.find(
    (value) => value === params.status,
  ) as AppointmentStatus | undefined;

  const [appointments, doctors, patients] = await Promise.all([
    getAppointments(doctorId, status),
    getDoctors(),
    getPatients(),
  ]);

  return (
    <DashboardShell>
      <PageContainer>
        <PageHeader
          title="Calendar"
          description="View and manage appointments by day, week, or month."
          actions={<AppointmentsViewSwitcher />}
        />

        <AppointmentsFilters
          doctors={doctors}
          doctorId={doctorId}
          status={status}
        />

        <Suspense
          fallback={
            <div className="h-[600px] animate-pulse rounded-lg bg-muted" />
          }
        >
          <AppointmentsCalendar
            appointments={appointments}
            doctors={doctors}
            patients={patients}
          />
        </Suspense>
      </PageContainer>
    </DashboardShell>
  );
}
