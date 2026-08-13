import { Card } from "./card";

type ChartCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function ChartCard({ title, description, children }: ChartCardProps) {
  return (
    <Card>
      <div className="mb-6">
        <h3 className="text-base font-semibold">{title}</h3>

        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>

      <div className="h-80 min-w-0">{children}</div>
    </Card>
  );
}
