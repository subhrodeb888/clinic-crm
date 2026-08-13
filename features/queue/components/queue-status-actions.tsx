"use client";

import { Button } from "@/components/ui/button";

import { updateQueueStatus } from "@/actions/appointments/update-queue-status";

import { Appointment } from "@/types/appointment";

type QueueStatusActionsProps = {
  appointment: Appointment;
};

export function QueueStatusActions({ appointment }: QueueStatusActionsProps) {
  if (appointment.queueStatus === "waiting") {
    return (
      <Button
        size="sm"
        className="w-full"
        onClick={() => updateQueueStatus(appointment.id, "checked_in")}
      >
        Check In
      </Button>
    );
  }

  if (appointment.queueStatus === "checked_in") {
    return (
      <div
        className="
          rounded-lg
          bg-amber-50
          py-2
          text-center
          text-sm
          font-medium
          text-amber-700
        "
      >
        Awaiting Doctor
      </div>
    );
  }

  if (appointment.queueStatus === "in_consultation") {
    return (
      <div
        className="
          rounded-lg
          bg-blue-50
          py-2
          text-center
          text-sm
          font-medium
          text-blue-700
        "
      >
        Consultation In Progress
      </div>
    );
  }

  return (
    <div
      className="
        rounded-lg
        bg-green-50
        py-2
        text-center
        text-sm
        font-medium
        text-green-700
      "
    >
      Consultation Completed
    </div>
  );
}
