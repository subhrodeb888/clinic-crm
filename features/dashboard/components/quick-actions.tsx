"use client";

import { useRouter } from "next/navigation";

import { CalendarPlus, UserPlus, Receipt } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

export function QuickActions() {
  const router = useRouter();

  return (
    <Card>
      <SectionHeader title="Quick Actions" />

      <div className="grid gap-3 sm:grid-cols-3">
        <Button
          className="justify-start gap-2"
          onClick={() => router.push("/appointments")}
        >
          <CalendarPlus size={18} />
          Add Appointment
        </Button>

        <Button
          variant="secondary"
          className="justify-start gap-2"
          onClick={() => router.push("/patients")}
        >
          <UserPlus size={18} />
          Add Patient
        </Button>

        <Button
          variant="outline"
          className="justify-start gap-2"
          onClick={() => router.push("/billing")}
        >
          <Receipt size={18} />
          Generate Invoice
        </Button>
      </div>
    </Card>
  );
}
