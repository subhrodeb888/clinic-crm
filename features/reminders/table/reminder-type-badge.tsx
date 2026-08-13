import { Badge } from "@/components/ui/badge";

import { Reminder } from "@/types/reminder";

type ReminderType = Reminder["type"];

type ReminderTypeBadgeProps = {
  type: ReminderType;
};

export function ReminderTypeBadge({ type }: ReminderTypeBadgeProps) {
  const typeMap = {
    appointment: {
      label: "Appointment",

      variant: "info" as const,
    },

    follow_up: {
      label: "Follow Up",

      variant: "warning" as const,
    },

    payment: {
      label: "Payment",

      variant: "danger" as const,
    },
  };

  const config = typeMap[type];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
