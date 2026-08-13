"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { ChartCard } from "@/components/ui/chart-card";

type RevenueChartProps = {
  data: {
    month: string;
    revenue: number;
  }[];
};

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ChartCard title="Revenue Overview" description="Daily revenue performance">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
          />

          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />

          <Tooltip />

          <Bar dataKey="revenue" fill="#16a34a" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
