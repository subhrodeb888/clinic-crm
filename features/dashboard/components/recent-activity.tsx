import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

type RecentActivityProps = {
  activities: {
    id: string;
    text: string;
    time: string | Date;
  }[];
};

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card>
      <SectionHeader title="Recent Activity" />

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="
              flex items-start justify-between
              border-b border-gray-100 pb-3
              last:border-none
            "
          >
            <p className="table-text">{activity.text}</p>

            <span className="helper-text">
              {new Date(activity.time).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
