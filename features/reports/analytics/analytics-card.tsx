import { Card } from "@/components/ui/card";

type AnalyticsCardProps = {
  title: string;

  description?: string;

  children: React.ReactNode;
};

export function AnalyticsCard({
  title,
  description,
  children,
}: AnalyticsCardProps) {
  return (
    <Card>
      <div className="mb-4">
        <h3
          className="
            text-lg font-semibold
            text-gray-900
          "
        >
          {title}
        </h3>

        {description && (
          <p
            className="
              mt-1 text-sm
              text-gray-500
            "
          >
            {description}
          </p>
        )}
      </div>

      {children}
    </Card>
  );
}
