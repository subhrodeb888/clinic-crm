"use client";

import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function AppointmentsViewSwitcher() {
  const router = useRouter();

  const pathname = usePathname();

  const isCalendar = pathname === "/appointments/calendar";

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={isCalendar ? "outline" : "primary"}
        onClick={() => {
          if (isCalendar) {
            router.push("/appointments");
          }
        }}
      >
        List
      </Button>

      <Button
        variant={isCalendar ? "primary" : "outline"}
        onClick={() => {
          if (!isCalendar) {
            router.push("/appointments/calendar");
          }
        }}
      >
        Calendar
      </Button>
    </div>
  );
}
