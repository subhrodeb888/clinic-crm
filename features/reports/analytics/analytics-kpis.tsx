import { CalendarDays, IndianRupee, Users, UserCheck } from "lucide-react";

import { StatsCard } from "@/features/dashboard/components/stats-card";

type AnalyticsKPIsProps = {
  metrics: {
    totalRevenue: number;
    totalAppointments: number;
    noShowRate: string;
    activePatients: number;
  };
};

export function AnalyticsKPIs({ metrics }: AnalyticsKPIsProps) {
  return (
    <div
      className="
        grid gap-6
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      <StatsCard
        title="Total Revenue"
        value={`₹${metrics.totalRevenue.toLocaleString()}`}
        icon={IndianRupee}
      />

      <StatsCard
        title="Appointments"
        value={metrics.totalAppointments}
        icon={CalendarDays}
      />

      <StatsCard
        title="No Show Rate"
        value={metrics.noShowRate}
        icon={UserCheck}
      />

      <StatsCard
        title="Active Patients"
        value={metrics.activePatients}
        icon={Users}
      />
    </div>
  );
}
