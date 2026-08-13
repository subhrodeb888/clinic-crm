import { Badge } from "@/components/ui/badge";

import { AppointmentStatus } from "@/types/enums";

type AppointmentStatusBadgeProps = {
  status: AppointmentStatus;
};

export function AppointmentStatusBadge({
  status,
}: AppointmentStatusBadgeProps) {
  const statusMap = {
    scheduled: {
      label: "Scheduled",
      variant: "info" as const,
    },

    confirmed: {
      label: "Confirmed",
      variant: "info" as const,
    },

    checked_in: {
      label: "Checked In",
      variant: "warning" as const,
    },

    in_consultation: {
      label: "In Consultation",
      variant: "warning" as const,
    },

    completed: {
      label: "Completed",
      variant: "success" as const,
    },

    cancelled: {
      label: "Cancelled",
      variant: "danger" as const,
    },

    no_show: {
      label: "No Show",
      variant: "danger" as const,
    },
  };

  const config = statusMap[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
