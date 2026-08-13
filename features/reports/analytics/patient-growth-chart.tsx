"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AnalyticsCard } from "./analytics-card";

type PatientGrowthChartProps = {
  data: {
    month: string;
    patients: number;
  }[];
};

export function PatientGrowthChart({ data }: PatientGrowthChartProps) {
  return (
    <AnalyticsCard
      title="Patient Growth"
      description="New patient registrations"
    >
      <div className="h-80">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="patients"
              stroke="#2563eb"
              fill="#93c5fd"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </AnalyticsCard>
  );
}
