import { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";

type StatsCardProps = {
  title: string;

  value: string | number;

  icon: LucideIcon;

  trend?: string;

  trendType?: "positive" | "negative";

  iconColor?: string;
};

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  trendType = "positive",
  iconColor = "text-blue-600",
}: StatsCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="helper-text">{title}</p>

          <h3 className="mt-2 text-3xl font-bold tracking-tight">{value}</h3>

          {trend && (
            <p
              className={`mt-2 text-xs font-medium ${
                trendType === "positive" ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend}
            </p>
          )}
        </div>

        <div
          className={`
            flex h-12 w-12 items-center justify-center
            rounded-xl bg-gray-100
            ${iconColor}
          `}
        >
          <Icon size={22} />
        </div>
      </div>
    </Card>
  );
}
