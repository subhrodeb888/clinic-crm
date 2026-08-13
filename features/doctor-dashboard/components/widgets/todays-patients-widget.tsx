import { DashboardWidget } from "@/components/dashboard/dashboard-widget";
import Link from "next/link";

type TodaysPatientsWidgetProps = {
  patients: {
    appointmentId: string;
    patientName: string;
    reason: string;
    startTime: string;
    queueStatus: "waiting" | "checked_in" | "in_consultation" | "completed";
  }[];
};

function formatQueueStatus(
  status: TodaysPatientsWidgetProps["patients"][number]["queueStatus"],
) {
  switch (status) {
    case "waiting":
      return "Waiting";
    case "checked_in":
      return "Checked In";
    case "in_consultation":
      return "In Consultation";
    case "completed":
      return "Completed";
  }
}

export function TodaysPatientsWidget({ patients }: TodaysPatientsWidgetProps) {
  return (
    <DashboardWidget
      title="Today's Appointments"
      description="Appointments on today's active clinic queue"
    >
      <div className="space-y-4">
        {patients.map((patient) => (
          <div
            key={patient.appointmentId}
            className="
              flex flex-col gap-4
              rounded-2xl border
              border-gray-200 p-4
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                {patient.patientName}
              </h3>

              <p className="mt-1 text-sm text-gray-500">{patient.reason}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div
                className="
                  rounded-xl bg-blue-50
                  px-3 py-2 text-sm
                  font-medium text-blue-700
                "
              >
                {patient.startTime}
              </div>

              <div
                className="
                  rounded-xl bg-gray-100
                  px-3 py-2 text-sm
                  font-medium text-gray-600
                "
              >
                {formatQueueStatus(patient.queueStatus)}
              </div>

              {patient.queueStatus === "waiting" && (
                <div
                  className="
                    rounded-xl bg-gray-100
                    px-4 py-2 text-sm
                    font-medium text-gray-500
                  "
                >
                  Waiting
                </div>
              )}

              {patient.queueStatus === "checked_in" && (
                <Link
                  href={`/doctors/consultations/${patient.appointmentId}`}
                  className="
                    rounded-xl bg-blue-600
                    px-4 py-2 text-sm
                    font-medium text-white
                    hover:bg-blue-700
                  "
                >
                  Start Consultation
                </Link>
              )}

              {patient.queueStatus === "in_consultation" && (
                <Link
                  href={`/doctors/consultations/${patient.appointmentId}`}
                  className="
                    rounded-xl border
                    border-gray-200
                    px-4 py-2 text-sm
                    font-medium
                    hover:bg-gray-50
                  "
                >
                  Continue Consultation
                </Link>
              )}

              {patient.queueStatus === "completed" && (
                <Link
                  href={`/doctors/consultations/${patient.appointmentId}`}
                  className="
                    rounded-xl border
                    border-gray-200
                    px-4 py-2 text-sm
                    font-medium
                    hover:bg-gray-50
                  "
                >
                  View Consultation
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardWidget>
  );
}
