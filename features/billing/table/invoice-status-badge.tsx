import { Badge } from "@/components/ui/badge";

import { InvoiceStatus } from "@/types/enums";

type InvoiceStatusBadgeProps = {
  status: InvoiceStatus;
};

export function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  const statusMap = {
    paid: {
      label: "Paid",
      variant: "success" as const,
    },

    pending: {
      label: "Pending",
      variant: "warning" as const,
    },

    partial: {
      label: "Partial",
      variant: "info" as const,
    },

    refunded: {
      label: "Refunded",
      variant: "neutral" as const,
    },
  };

  const config = statusMap[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
