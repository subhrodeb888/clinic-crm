import { Badge } from "@/components/ui/badge";

import { UserRole } from "@/types/enums";

type RoleBadgeProps = {
  role: UserRole;
};

export function RoleBadge({ role }: RoleBadgeProps) {
  const config = {
    admin: {
      label: "Admin",

      variant: "danger" as const,
    },

    doctor: {
      label: "Doctor",

      variant: "info" as const,
    },

    receptionist: {
      label: "Receptionist",

      variant: "success" as const,
    },
  };

  return <Badge variant={config[role].variant}>{config[role].label}</Badge>;
}
