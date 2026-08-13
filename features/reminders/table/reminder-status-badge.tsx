import { Badge } from "@/components/ui/badge";

import { ReminderStatus } from "@/types/enums";

type ReminderStatusBadgeProps = {
  status: ReminderStatus;
};

export function ReminderStatusBadge({ status }: ReminderStatusBadgeProps) {
  const statusMap = {
    sent: {
      label: "Sent",

      variant: "success" as const,
    },

    pending: {
      label: "Pending",

      variant: "warning" as const,
    },

    failed: {
      label: "Failed",

      variant: "danger" as const,
    },
  };

  const config = statusMap[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
