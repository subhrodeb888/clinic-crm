import { Clock3 } from "lucide-react";

import { Card } from "@/components/ui/card";

type ConsultationHeaderProps = {
  patientName: string;

  appointmentTime: string;

  doctorName: string;
};

export function ConsultationHeader({
  patientName,
  appointmentTime,
  doctorName,
}: ConsultationHeaderProps) {
  return (
    <Card
      className="
        sticky top-0 z-30
        border border-gray-200
        bg-white p-5
      "
    >
      <div
        className="
          flex flex-col gap-5
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* LEFT */}

        <div>
          <h1
            className="
              text-2xl font-bold
              text-gray-900
            "
          >
            {patientName}
          </h1>

          <p className="mt-1 text-sm text-gray-500">Consultation Workspace</p>
        </div>

        {/* RIGHT */}

        <div
          className="
            flex flex-wrap
            items-center gap-4
          "
        >
          <div
            className="
              flex items-center
              gap-2 rounded-xl
              bg-blue-50 px-4 py-2
              text-sm font-medium
              text-blue-700
            "
          >
            <Clock3 size={16} />

            {appointmentTime}
          </div>

          <div
            className="
              rounded-xl bg-gray-100
              px-4 py-2 text-sm
              font-medium text-gray-700
            "
          >
            {doctorName}
          </div>
        </div>
      </div>
    </Card>
  );
}
