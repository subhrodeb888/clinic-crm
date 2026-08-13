import { DashboardWidget } from "@/components/dashboard/dashboard-widget";

type QueueSummaryWidgetProps = {
  stats: {
    label: string;
    value: number;
  }[];
};

export function QueueSummaryWidget({ stats }: QueueSummaryWidgetProps) {
  return (
    <DashboardWidget
      title="Queue Summary"
      description="Live clinic queue overview"
    >
      <div className="space-y-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="
              flex items-center
              justify-between rounded-xl
              border border-gray-200
              p-4
            "
          >
            <p
              className="
                text-sm font-medium
                text-gray-700
              "
            >
              {stat.label}
            </p>

            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl bg-blue-50
                font-semibold text-blue-700
              "
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </DashboardWidget>
  );
}
