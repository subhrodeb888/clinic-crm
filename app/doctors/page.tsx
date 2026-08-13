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
  const metrics = await getDoctorDashboardMetrics();
  const todaysPatients = await getTodaysPatients();
  const queueSummary = await getQueueSummary();
  const recentConsultations = await getRecentConsultations();

  return (
    <DashboardShell>
      <PageContainer>
        {/* PAGE HEADER */}

        <PageHeader
          title="Doctor Dashboard"
          description="Clinical overview and consultation workflow"
        />

        {/* KPI GRID */}

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

        {/* MAIN GRID */}

        <div
          className="
            grid gap-6
            xl:grid-cols-3
          "
        >
          {/* LEFT */}

          <div className="space-y-6 xl:col-span-2">
            <TodaysPatientsWidget patients={todaysPatients} />

            <RecentConsultationsWidget consultations={recentConsultations} />
          </div>

          {/* RIGHT */}

          <div className="space-y-6">
            <QueueSummaryWidget stats={queueSummary} />
          </div>
        </div>
      </PageContainer>
    </DashboardShell>
  );
}
