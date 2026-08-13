import { Appointment } from "@/types/appointment";

import { QueueCard } from "./queue-card";

type QueueColumnProps = {
  title: string;

  appointments: Appointment[];
};

export function QueueColumn({ title, appointments }: QueueColumnProps) {
  return (
    <div
      className="
        rounded-2xl border border-gray-200
        bg-gray-50 p-4
      "
    >
      {/* HEADER */}

      <div
        className="
          mb-4 flex items-center
          justify-between
        "
      >
        <h2 className="font-semibold">{title}</h2>

        <div
          className="
            flex h-7 w-7 items-center
            justify-center rounded-full
            bg-white text-sm font-medium
          "
        >
          {appointments.length}
        </div>
      </div>

      {/* CARDS */}

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <QueueCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
}
