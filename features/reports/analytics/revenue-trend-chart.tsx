"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { AnalyticsCard } from "./analytics-card";

type RevenueTrendChartProps = {
  data: {
    month: string;
    revenue: number;
  }[];
};

export function RevenueTrendChart({ data }: RevenueTrendChartProps) {
  return (
    <AnalyticsCard
      title="Revenue Trends"
      description="Monthly revenue performance"
    >
      <div className="h-80">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </AnalyticsCard>
  );
}
