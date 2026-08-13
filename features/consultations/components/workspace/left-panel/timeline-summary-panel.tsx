import { Card } from "@/components/ui/card";

type TimelineSummaryPanelProps = {
  events: string[];
};

export function TimelineSummaryPanel({ events }: TimelineSummaryPanelProps) {
  return (
    <Card className="p-5">
      <div className="mb-5">
        <h2 className="section-title">Timeline Summary</h2>

        <p className="helper-text">Recent patient activity</p>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event}
            className="
              rounded-xl border
              border-gray-200 p-4
            "
          >
            <p className="text-sm">{event}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
