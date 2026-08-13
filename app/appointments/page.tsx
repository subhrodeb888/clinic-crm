import { getPatients } from "@/actions/patients/get-patients";
import { getDoctors } from "@/actions/doctors/get-doctors";

import { getAppointments } from "@/actions/appointments/get-appointments";

import { DashboardShell } from "@/components/layout/dashboard-shell";

import { PageContainer } from "@/components/layout/page-container";

import { PageHeader } from "@/components/layout/page-header";

import { AppointmentsTable } from "@/features/appointments/components/appointments-table";

import { CreateAppointmentButton } from "@/features/appointments/components/create-appointment-button";
import { AppointmentsViewSwitcher } from "@/features/appointments/components/appointments-view-switcher";

export default async function AppointmentsPage() {
  const appointments = await getAppointments();

  const patients = await getPatients();

  const doctors = await getDoctors();

  console.log("Doctors", doctors[0]);

  return (
    <DashboardShell>
      <PageContainer>
        <PageHeader
          title="Appointments"
          description="Manage clinic appointments"
          actions={
            <div className="flex items-center gap-3">
              <AppointmentsViewSwitcher />

              <CreateAppointmentButton patients={patients} doctors={doctors} />
            </div>
          }
        />

        <AppointmentsTable
          appointments={appointments}
          patients={patients}
          doctors={doctors}
        />
      </PageContainer>
    </DashboardShell>
  );
}
