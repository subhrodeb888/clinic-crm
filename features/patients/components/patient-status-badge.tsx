import { Badge } from "@/components/ui/badge";

import { PatientStatus } from "@/types/patient";

type PatientStatusBadgeProps = {
  status: PatientStatus;
};

export function PatientStatusBadge({ status }: PatientStatusBadgeProps) {
  const statusMap = {
    active: {
      label: "Active",
      variant: "success" as const,
    },

    inactive: {
      label: "Inactive",
      variant: "neutral" as const,
    },

    follow_up: {
      label: "Follow Up",
      variant: "warning" as const,
    },

    high_risk: {
      label: "High Risk",
      variant: "danger" as const,
    },
  };

  const config = statusMap[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
