import { Clock3 } from "lucide-react";

import { Card } from "@/components/ui/card";

import { Appointment } from "@/types/appointment";

import { QueueStatusActions } from "./queue-status-actions";

type QueueCardProps = {
  appointment: Appointment;
};

export function QueueCard({ appointment }: QueueCardProps) {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        {/* PATIENT */}

        <div>
          <h3 className="font-semibold text-gray-900">
            {appointment.patient.firstName} {appointment.patient.lastName}
          </h3>

          <p className="helper-text">{appointment.patient.phone}</p>
        </div>

        {/* APPOINTMENT INFO */}

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Clock3 size={15} className="text-blue-600" />

            <span className="text-sm font-medium">{appointment.startTime}</span>
          </div>

          <p className="text-sm text-gray-600">
            Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}
          </p>
        </div>

        {/* ACTIONS */}

        <QueueStatusActions appointment={appointment} />
      </div>
    </Card>
  );
}
