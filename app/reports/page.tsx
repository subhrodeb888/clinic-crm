import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";

import { AnalyticsKPIs } from "@/features/reports/analytics/analytics-kpis";

import { RevenueTrendChart } from "@/features/reports/analytics/revenue-trend-chart";
import { AppointmentAnalyticsChart } from "@/features/reports/analytics/appointment-analytics-chart";
import { DoctorPerformanceChart } from "@/features/reports/analytics/doctor-performance-chart";
import { NoShowRateChart } from "@/features/reports/analytics/no-show-rate-chart";
import { PatientGrowthChart } from "@/features/reports/analytics/patient-growth-chart";

import { getRevenueTrend } from "@/actions/reports/get-revenue-trend";
import { getReportMetrics } from "@/actions/reports/get-report-metrics";
import { getAppointmentAnalytics } from "@/actions/reports/get-appointment-analytics";
import { getNoShowAnalytics } from "@/actions/reports/get-no-show-analytics";
import { getPatientGrowth } from "@/actions/reports/get-patient-growth";
import { getDoctorPerformance } from "@/actions/reports/get-doctor-performance";

import { Card } from "@/components/ui/card";

export default async function ReportsPage() {
  const metrics = await getReportMetrics();

  const revenueTrend = await getRevenueTrend();

  const appointmentAnalytics = await getAppointmentAnalytics();

  const noShowAnalytics = await getNoShowAnalytics();

  const patientGrowth = await getPatientGrowth();

  const doctorPerformance = await getDoctorPerformance();
  return (
    <DashboardShell>
      <PageContainer>
        <PageHeader
          title="Reports & Analytics"
          description="Operational reporting and clinic performance insights."
        />

        <div className="space-y-6">
          {/* KPI STRIP */}

          <AnalyticsKPIs metrics={metrics} />

          {/* ROW 1 */}

          <div
            className="
              grid gap-6
              xl:grid-cols-2
            "
          >
            <RevenueTrendChart data={revenueTrend} />

            <AppointmentAnalyticsChart data={appointmentAnalytics} />
          </div>

          {/* ROW 2 */}

          <div
            className="
              grid gap-6
              xl:grid-cols-[2fr_1fr]
            "
          >
            <DoctorPerformanceChart data={doctorPerformance} />

            <NoShowRateChart data={noShowAnalytics} />
          </div>

          {/* ROW 3 */}

          <PatientGrowthChart data={patientGrowth} />

          {/* OPERATIONAL INSIGHTS */}

          <Card>
            <h2
              className="
                mb-4 text-lg
                font-semibold
                text-gray-900
              "
            >
              Operational Insights
            </h2>

            <div
              className="
                grid gap-4
                md:grid-cols-2
              "
            >
              <InsightCard
                title="Revenue Growth"
                value="+18%"
                description="Compared to previous month"
              />

              <InsightCard
                title="Appointment Growth"
                value="+12%"
                description="Monthly increase"
              />

              <InsightCard
                title="No Show Improvement"
                value="-2%"
                description="Reduced missed appointments"
              />

              <InsightCard
                title="Top Performing Doctor"
                value="Dr. Amit Roy"
                description="Highest completed consultations"
              />
            </div>
          </Card>
        </div>
      </PageContainer>
    </DashboardShell>
  );
}

type InsightCardProps = {
  title: string;

  value: string;

  description: string;
};

function InsightCard({ title, value, description }: InsightCardProps) {
  return (
    <div
      className="
        rounded-xl
        border border-gray-200
        bg-gray-50
        p-4
      "
    >
      <p
        className="
          text-sm
          text-gray-500
        "
      >
        {title}
      </p>

      <p
        className="
          mt-2 text-2xl
          font-bold
          text-gray-900
        "
      >
        {value}
      </p>

      <p
        className="
          mt-1 text-sm
          text-gray-500
        "
      >
        {description}
      </p>
    </div>
  );
}
