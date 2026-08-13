import type { PatientTimelineEvent } from "@/types/patient-timeline";

import { TimelineIcon } from "./timeline-icon";

type TimelineItemProps = {
  event: PatientTimelineEvent;
};

export function TimelineItem({ event }: TimelineItemProps) {
  return (
    <div className="flex gap-4">
      {/* ICON */}

      <TimelineIcon type={event.type} />

      {/* CONTENT */}

      <div className="flex-1">
        <div
          className="
            flex flex-col gap-2
            lg:flex-row
            lg:items-start
            lg:justify-between
          "
        >
          {/* LEFT */}

          <div>
            <h3
              className="
                text-sm font-semibold
                text-gray-900
              "
            >
              {event.title}
            </h3>

            <p
              className="
                mt-1 text-sm
                leading-7 text-gray-600
              "
            >
              {event.description}
            </p>
          </div>

          {/* RIGHT */}

          <div
            className="
              text-sm text-gray-500
              lg:text-right
            "
          >
            {event.createdAt.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
