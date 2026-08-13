import { Card } from "@/components/ui/card";

import type { Appointment } from "@/types/appointment";

type AppointmentsTabProps = {
  appointments: Appointment[];
};

export function AppointmentsTab({ appointments }: AppointmentsTabProps) {
  return (
    <Card className="p-5">
      <div className="mb-6">
        <h2 className="section-title">Appointment History</h2>

        <p className="helper-text">Complete appointment timeline</p>
      </div>

      {appointments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 p-8 text-center">
          <p className="text-sm font-medium text-gray-900">
            No appointments found
          </p>

          <p className="mt-1 text-sm text-gray-500">
            This patient does not have any appointments yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="
                flex flex-col gap-4
                rounded-2xl border
                border-gray-200 p-4
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              <div className="space-y-1">
                <p className="font-semibold">{appointment.appointmentDate}</p>

                <p className="text-sm text-gray-500">
                  {appointment.startTime} - {appointment.endTime}
                </p>

                <p className="text-sm text-gray-500">
                  Dr. {appointment.doctor.firstName}{" "}
                  {appointment.doctor.lastName}
                </p>

                {appointment.reason && (
                  <p className="text-sm text-gray-500">{appointment.reason}</p>
                )}
              </div>

              <div
                className="
                  rounded-xl bg-blue-50
                  px-3 py-2 text-sm
                  font-medium capitalize text-blue-700
                "
              >
                {appointment.status.replace("_", " ")}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
