import { Phone, Mail } from "lucide-react";

import { Card } from "@/components/ui/card";

import { Patient } from "@/types/patient";

import { PatientStatusBadge } from "../patient-status-badge";

type PatientProfileHeaderProps = {
  patient: Patient;

  outstandingBalance: number;
};

export function PatientProfileHeader({
  patient,
  outstandingBalance,
}: PatientProfileHeaderProps) {
  const hasOutstandingBalance = outstandingBalance > 0;

  return (
    <Card className="p-6">
      <div
        className="
          flex flex-col gap-6
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* LEFT */}

        <div className="flex gap-5">
          {/* AVATAR */}

          <div
            className="
              flex h-16 w-16
              items-center justify-center
              rounded-2xl bg-blue-100
              text-xl font-semibold
              text-blue-700
            "
          >
            {patient.firstName[0]}
            {patient.lastName[0]}
          </div>

          {/* INFO */}

          <div className="space-y-2">
            <div
              className="
                flex flex-wrap
                items-center gap-3
              "
            >
              <h1
                className="
                  text-2xl font-bold
                  text-gray-900
                "
              >
                {patient.firstName} {patient.lastName}
              </h1>

              <PatientStatusBadge status={patient.status} />
            </div>

            <div
              className="
                flex flex-wrap gap-4
                text-sm text-gray-500
              "
            >
              <div className="flex items-center gap-2">
                <Phone size={14} />

                {patient.phone}
              </div>

              {patient.email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} />

                  {patient.email}
                </div>
              )}
            </div>

            <div
              className="
                flex flex-wrap gap-4
                text-sm text-gray-500
              "
            >
              <span>DOB: {patient.dateOfBirth}</span>

              <span>Blood Group: {patient.bloodGroup}</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div
          className="
            rounded-2xl bg-gray-50
            px-5 py-4
          "
        >
          <p className="helper-text">Outstanding Balance</p>

          <p
            className={`mt-1 text-2xl font-bold ${
              hasOutstandingBalance ? "text-red-600" : "text-green-600"
            }`}
          >
            ₹{outstandingBalance.toFixed(2)}
          </p>
        </div>
      </div>
    </Card>
  );
}
