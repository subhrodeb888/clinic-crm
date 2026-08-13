import { DashboardShell } from "@/components/layout/dashboard-shell";

import { PageContainer } from "@/components/layout/page-container";

import { PageHeader } from "@/components/layout/page-header";

import { PatientQueueBoard } from "@/features/queue/components/patient-queue-board";

import { getTodaysAppointments } from "@/actions/appointments/get-todays-appointments";

export default async function QueuePage() {
  const appointments = await getTodaysAppointments();
  return (
    <DashboardShell>
      <PageContainer>
        <PageHeader
          title="Patient Queue"
          description="Live clinic workflow overview"
        />

        <PatientQueueBoard appointments={appointments} />
      </PageContainer>
    </DashboardShell>
  );
}
