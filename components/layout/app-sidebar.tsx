"use client";

import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Stethoscope,
  CreditCard,
  BarChart3,
  Bell,
  Settings,
  ClipboardList,
  LogOut,
} from "lucide-react";

import { signOut } from "next-auth/react";

import type { Role } from "@/lib/auth/roles";
import { sidebarLinks } from "@/lib/navigation";

import { SidebarLink } from "./sidebar-link";

type AppSidebarProps = {
  role?: Role | string | null;
};

const iconMap = {
  dashboard: LayoutDashboard,
  calendar: CalendarDays,
  users: Users,
  stethoscope: Stethoscope,
  "credit-card": CreditCard,
  "bar-chart": BarChart3,
  bell: Bell,
  settings: Settings,
  queues: ClipboardList,
};

export function AppSidebar({ role }: AppSidebarProps) {
  const visibleLinks = sidebarLinks.filter((link) =>
    role ? link.roles.includes(role as Role) : false,
  );

  return (
    <aside
      className="
        hidden
        h-screen
        w-64
        shrink-0
        flex-col
        overflow-hidden
        border-r
        border-gray-200
        bg-white
        lg:flex
      "
    >
      {/* Header */}
      <div className="shrink-0 border-b border-gray-200 p-6">
        <h1 className="text-xl font-bold">ClinicFlow</h1>
      </div>

      {/* Scrollable navigation */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        <nav className="flex flex-col gap-1 p-4">
          {visibleLinks.map((link) => {
            const Icon = iconMap[link.icon as keyof typeof iconMap];

            return (
              <SidebarLink
                key={link.href}
                href={link.href}
                label={link.label}
                icon={Icon}
              />
            );
          })}
        </nav>
      </div>

      {/* Fixed sidebar footer */}
      <div className="shrink-0 border-t border-gray-200 bg-white p-4">
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="
            flex w-full items-center gap-3
            rounded-xl px-3 py-2.5
            text-sm font-medium text-gray-600
            transition-colors
            hover:bg-gray-100 hover:text-gray-900
          "
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
