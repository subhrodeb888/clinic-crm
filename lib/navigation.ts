import type { Role } from "@/lib/auth/roles";

export type SidebarLink = {
  label: string;
  href: string;
  icon: string;
  roles: Role[];
};

export const sidebarLinks: SidebarLink[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    roles: ["admin", "doctor", "receptionist"],
  },
  {
    label: "Appointments",
    href: "/appointments",
    icon: "calendar",
    roles: ["admin", "doctor", "receptionist"],
  },
  {
    label: "Queues",
    href: "/queues",
    icon: "queues",
    roles: ["admin", "doctor", "receptionist"],
  },
  {
    label: "Patients",
    href: "/patients",
    icon: "users",
    roles: ["admin", "doctor", "receptionist"],
  },
  {
    label: "Doctors",
    href: "/doctors",
    icon: "stethoscope",
    roles: ["admin", "doctor"],
  },
  {
    label: "Billing",
    href: "/billing",
    icon: "credit-card",
    roles: ["admin", "receptionist"],
  },
  {
    label: "Reports",
    href: "/reports",
    icon: "bar-chart",
    roles: ["admin"],
  },
  {
    label: "Reminders",
    href: "/reminders",
    icon: "bell",
    roles: ["admin", "receptionist"],
  },
  
];
