"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { AnalyticsCard } from "./analytics-card";

type NoShowRateChartProps = {
  data: {
    name: string;
    value: number;
  }[];
};

export function NoShowRateChart({ data }: NoShowRateChartProps) {
  return (
    <AnalyticsCard title="No Show Rate" description="Attendance overview">
      <div className="h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" />

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </AnalyticsCard>
  );
}
