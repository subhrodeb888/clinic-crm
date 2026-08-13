import { CalendarDays, IndianRupee, Users, Wallet } from "lucide-react";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";

import { StatsCard } from "@/features/dashboard/components/stats-card";

import { QuickActions } from "@/features/dashboard/components/quick-actions";

import { RecentActivity } from "@/features/dashboard/components/recent-activity";

import { OperationalOverview } from "@/features/dashboard/components/operational-overview";

import { AppointmentTrendChart } from "@/features/dashboard/components/charts/appointment-trend-chart";
import { RevenueChart } from "@/features/dashboard/components/charts/revenue-chart";
import { PatientGrowthChart } from "@/features/dashboard/components/charts/patient-growth-chart";
import { AppointmentStatusDistribution } from "@/features/dashboard/components/charts/appointment-status-distribution";

import { getDashboardMetrics } from "@/actions/dashboard/get-dashboard-metrics";
import { getRevenueChartData } from "@/actions/dashboard/get-revenue-chart-data";
import { getAppointmentTrendData } from "@/actions/dashboard/get-appointment-trend-data";
import { getPatientGrowthData } from "@/actions/dashboard/get-patient-growth-data";
import { getAppointmentStatusDistribution } from "@/actions/dashboard/get-appointment-status-distribution";
import { getRecentActivity } from "@/actions/dashboard/get-recent-activity";
import { getOperationalOverview } from "@/actions/dashboard/get-operational-overview";

export default async function DashboardPage() {
  const metrics = await getDashboardMetrics();
  const revenueChartData = await getRevenueChartData();
  const appointmentTrendData = await getAppointmentTrendData();
  const patientGrowthData = await getPatientGrowthData();
  const appointmentStatusDistribution =
    await getAppointmentStatusDistribution();
  const recentActivity = await getRecentActivity();
  const operationalOverview = await getOperationalOverview();

  return (
    <DashboardShell>
      <PageContainer>
        <PageHeader
          title="Dashboard"
          description="Clinic operational overview"
        />

        <div className="space-y-6">
          {/* KPI GRID */}

          <div
            className="
              grid gap-6
              sm:grid-cols-2
              xl:grid-cols-4
            "
          >
            <StatsCard
              title="Appointments Today"
              value={metrics.appointmentsToday}
              icon={CalendarDays}
            />

            <StatsCard
              title="Checked-In Patients"
              value={metrics.checkedInPatients}
              icon={Users}
              iconColor="text-green-600"
            />

            <StatsCard
              title="Revenue Today"
              value={`₹${metrics.revenueToday}`}
              icon={IndianRupee}
              iconColor="text-yellow-600"
            />

            <StatsCard
              title="Outstanding Balance"
              value={`₹${metrics.outstandingBalance.toLocaleString()}`}
              icon={Wallet}
              iconColor="text-red-600"
            />
          </div>

          <div
            className="
    grid gap-6
    xl:grid-cols-2
  "
          >
            <AppointmentTrendChart data={appointmentTrendData} />

            <RevenueChart data={revenueChartData} />
          </div>

          <div
            className="
    grid gap-6
    xl:grid-cols-[2fr_1fr]
  "
          >
            <PatientGrowthChart data={patientGrowthData} />

            <AppointmentStatusDistribution
              data={appointmentStatusDistribution}
            />
          </div>

          {/* MAIN GRID */}

          <div
            className="
              grid gap-6
              xl:grid-cols-[2fr_1fr]
            "
          >
            <RecentActivity activities={recentActivity} />

            <OperationalOverview data={operationalOverview} />
          </div>

          {/* QUICK ACTIONS */}

          <QuickActions />
        </div>
      </PageContainer>
    </DashboardShell>
  );
}
