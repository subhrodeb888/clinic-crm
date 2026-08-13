import { CalendarPlus, ClipboardCheck, FileText } from "lucide-react";

import type { PatientTimelineEvent } from "@/types/patient-timeline";

type TimelineIconProps = {
  type: PatientTimelineEvent["type"];
};

export function TimelineIcon({ type }: TimelineIconProps) {
  const iconMap = {
    appointment: CalendarPlus,
    consultation: ClipboardCheck,
    prescription: FileText,
  };

  const Icon = iconMap[type];

  return (
    <div
      className="
        flex h-10 w-10
        items-center justify-center
        rounded-xl bg-blue-50
        text-blue-600
      "
    >
      <Icon size={18} />
    </div>
  );
}
