import type { PatientTimelineEvent } from "@/types/patient-timeline";

export function groupTimelineByDate(events: PatientTimelineEvent[]) {
  return events.reduce(
    (groups, event) => {
      const date = event.createdAt.toISOString().split("T")[0];

      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(event);

      return groups;
    },
    {} as Record<string, PatientTimelineEvent[]>,
  );
}