"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartCard } from "@/components/ui/chart-card";

type AppointmentTrendChartProps = {
  data: {
    month: string;
    appointments: number;
  }[];
};

export function AppointmentTrendChart({ data }: AppointmentTrendChartProps) {
  return (
    <ChartCard
      title="Appointment Trends"
      description="Appointments over the past week"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient
              id="appointmentGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.35} />

              <stop offset="100%" stopColor="#2563eb" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
          />

          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="appointments"
            stroke="#2563eb"
            strokeWidth={2}
            fill="url(#appointmentGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
