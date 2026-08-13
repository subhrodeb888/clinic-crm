"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AnalyticsCard } from "./analytics-card";

type AppointmentAnalyticsChartProps = {
  data: {
    month: string;
    appointments: number;
  }[];
};

export function AppointmentAnalyticsChart({
  data,
}: AppointmentAnalyticsChartProps) {
  return (
    <AnalyticsCard
      title="Appointment Analytics"
      description="Monthly appointment volume"
    >
      <div className="h-80">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="appointments" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AnalyticsCard>
  );
}
