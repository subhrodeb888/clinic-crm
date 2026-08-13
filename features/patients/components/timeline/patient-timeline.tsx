import { Card } from "@/components/ui/card";

import { groupTimelineByDate } from "../../utils/group-timeline-by-date";

import { TimelineGroup } from "./timeline-group";

import type { PatientTimelineEvent } from "@/types/patient-timeline";

type PatientTimelineProps = {
  events: PatientTimelineEvent[];
};

export function PatientTimeline({ events }: PatientTimelineProps) {
  const groupedTimeline = groupTimelineByDate(events);

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="section-title">Patient Timeline</h2>

        <p className="helper-text">Complete operational activity history</p>
      </div>

      <div className="space-y-10">
        {Object.entries(groupedTimeline).map(([date, events]) => (
          <TimelineGroup key={date} date={date} events={events} />
        ))}
      </div>
    </Card>
  );
}
