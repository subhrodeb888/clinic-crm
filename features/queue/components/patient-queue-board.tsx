import { QueueColumn } from "./queue-column";
import { Appointment } from "@/types/appointment";

import { groupAppointmentsByStatus } from "../utils/group-appointments-by-status";

type PatientQueueBoardProps = {
  appointments: Appointment[];
};

export function PatientQueueBoard({ appointments }: PatientQueueBoardProps) {
  const groupedAppointments = groupAppointmentsByStatus(appointments);

  return (
    <div
      className="
        grid gap-6
        xl:grid-cols-4
      "
    >
      <QueueColumn title="Waiting" appointments={groupedAppointments.waiting} />

      <QueueColumn
        title="Checked In"
        appointments={groupedAppointments.checked_in}
      />

      <QueueColumn
        title="In Consultation"
        appointments={groupedAppointments.in_consultation}
      />

      <QueueColumn
        title="Completed"
        appointments={groupedAppointments.completed}
      />
    </div>
  );
}
