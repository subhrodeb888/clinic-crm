import type { PatientTimelineEvent } from "@/types/patient-timeline";

import { TimelineItem } from "./timeline-item";

type TimelineGroupProps = {
  date: string;

  events: PatientTimelineEvent[];
};

export function TimelineGroup({ date, events }: TimelineGroupProps) {
  return (
    <div className="space-y-6">
      {/* DATE */}

      <div
        className="
          sticky top-[72px] z-10
          inline-flex rounded-xl
          bg-gray-100 px-3 py-2
          text-sm font-medium
          text-gray-700
        "
      >
        {date}
      </div>

      {/* EVENTS */}

      <div className="space-y-8">
        {events.map((event) => (
          <TimelineItem key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
