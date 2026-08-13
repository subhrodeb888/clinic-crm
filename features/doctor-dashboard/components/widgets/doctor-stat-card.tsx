import { Card } from "@/components/ui/card";

type DoctorStatCardProps = {
  label: string;

  value: string | number;

  trend?: string;
};

export function DoctorStatCard({ label, value, trend }: DoctorStatCardProps) {
  return (
    <Card className="p-5">
      <div className="space-y-2">
        <p className="helper-text">{label}</p>

        <div
          className="
            flex items-end
            justify-between
          "
        >
          <h3
            className="
              text-3xl font-bold
              text-gray-900
            "
          >
            {value}
          </h3>

          {trend && (
            <span
              className="
                text-sm font-medium
                text-green-600
              "
            >
              {trend}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
