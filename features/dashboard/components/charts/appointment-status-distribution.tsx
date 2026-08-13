"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

type AppointmentStatusDistributionProps = {
  data: {
    name: string;
    value: number;
  }[];
};

const STATUS_COLORS: Record<string, string> = {
  completed: "#16a34a",

  checked_in: "#eab308",

  in_consultation: "#2563eb",

  cancelled: "#dc2626",

  no_show: "#6b7280",

  scheduled: "#9333ea",

  confirmed: "#0891b2",
};

export function AppointmentStatusDistribution({
  data,
}: AppointmentStatusDistributionProps) {
  return (
    <Card>
      <SectionHeader title="Appointment Status" />

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={STATUS_COLORS[entry.name] ?? "#9ca3af"}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-3">
        {data.map((status) => (
          <div key={status.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: STATUS_COLORS[status.name] ?? "#9ca3af",
                }}
              />

              <span className="table-text">
                {status.name.replaceAll("_", " ")}
              </span>
            </div>

            <span className="font-medium">{status.value}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
