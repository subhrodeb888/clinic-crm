"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { ChartCard } from "@/components/ui/chart-card";

type PatientGrowthChartProps = {
  data: {
    month: string;
    patients: number;
  }[];
};

export function PatientGrowthChart({ data }: PatientGrowthChartProps) {
  return (
    <ChartCard
      title="Patient Growth"
      description="Monthly patient registrations"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
          />

          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="patients"
            stroke="#7c3aed"
            strokeWidth={3}
            dot={{
              r: 4,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
