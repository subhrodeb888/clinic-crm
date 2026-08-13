import { auth } from "@/auth";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";

import { DoctorStatCard } from "@/features/doctor-dashboard/components/widgets/doctor-stat-card";
import { TodaysPatientsWidget } from "@/features/doctor-dashboard/components/widgets/todays-patients-widget";
import { QueueSummaryWidget } from "@/features/doctor-dashboard/components/widgets/queue-summary-widget";
import { RecentConsultationsWidget } from "@/features/doctor-dashboard/components/widgets/recent-consultations-widget";

import { getDoctorDashboardMetrics } from "@/actions/doctor-dashboard/get-doctor-dashboard-metrics";
import { getTodaysPatients } from "@/actions/doctor-dashboard/get-todays-patients";
import { getQueueSummary } from "@/actions/doctor-dashboard/get-queue-summary";
import { getRecentConsultations } from "@/actions/doctor-dashboard/get-recent-consultations";

export default async function DoctorDashboardPage() {
  const session = await auth();

  const role = session?.user?.role;

  if (role !== "doctor") {
    return (
      <DashboardShell>
        <PageContainer>
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl">
                🔒
              </div>

              <h1 className="text-xl font-semibold text-gray-900">
                Doctor Dashboard
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                This dashboard is available only to users with a doctor account.
              </p>
            </div>
          </div>
        </PageContainer>
      </DashboardShell>
    );
  }

  const metrics = await getDoctorDashboardMetrics();
  const todaysPatients = await getTodaysPatients();
  const queueSummary = await getQueueSummary();
  const recentConsultations = await getRecentConsultations();

  return (
    <DashboardShell>
      <PageContainer>
        <PageHeader
          title="Doctor Dashboard"
          description="Clinical overview and consultation workflow"
        />

        <div
          className="
            mb-6 grid gap-5
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          <DoctorStatCard
            label="Today's Appointments"
            value={metrics.todaysAppointments}
          />

          <DoctorStatCard
            label="Completed Consultations (30 Days)"
            value={metrics.completedConsultations}
          />

          <DoctorStatCard label="Queue Waiting" value={metrics.queueWaiting} />
        </div>

        <div
          className="
            grid gap-6
            xl:grid-cols-3
          "
        >
          <div className="space-y-6 xl:col-span-2">
            <TodaysPatientsWidget patients={todaysPatients} />

            <RecentConsultationsWidget consultations={recentConsultations} />
          </div>

          <div className="space-y-6">
            <QueueSummaryWidget stats={queueSummary} />
          </div>
        </div>
      </PageContainer>
    </DashboardShell>
  );
}
