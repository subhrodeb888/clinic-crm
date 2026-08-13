import { Bell, Clock3, AlertTriangle, RefreshCcw } from "lucide-react";

import { StatsCard } from "@/features/dashboard/components/stats-card";

type ReminderKPIsProps = {
  metrics: {
    sentToday: number;
    pending: number;
    failed: number;
    followUpsDue: number;
  };
};

export function ReminderKPIs({ metrics }: ReminderKPIsProps) {
  return (
    <div
      className="
        grid gap-6
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      <StatsCard
        title="Sent Today"
        value={metrics.sentToday}
        icon={Bell}
        trend="+8 from yesterday"
      />

      <StatsCard
        title="Pending"
        value={metrics.pending}
        icon={Clock3}
        trend="Needs review"
        iconColor="text-yellow-600"
      />

      <StatsCard
        title="Failed"
        value={metrics.failed}
        icon={AlertTriangle}
        trend="Requires action"
        trendType="negative"
        iconColor="text-red-600"
      />

      <StatsCard
        title="Follow-Ups Due"
        value={metrics.followUpsDue}
        icon={RefreshCcw}
        trend="Today's workload"
        iconColor="text-blue-600"
      />
    </div>
  );
}
