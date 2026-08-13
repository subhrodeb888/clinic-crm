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

type DoctorPerformanceChartProps = {
  data: {
    doctor: string;
    consultations: number;
  }[];
};

export function DoctorPerformanceChart({ data }: DoctorPerformanceChartProps) {
  return (
    <AnalyticsCard
      title="Doctor Performance"
      description="Consultations completed"
    >
      <div className="h-80">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="doctor" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="consultations" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AnalyticsCard>
  );
}
