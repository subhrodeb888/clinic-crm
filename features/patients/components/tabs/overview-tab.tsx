import { Card } from "@/components/ui/card";

import { Patient } from "@/types/patient";

import { PatientTimeline } from "../timeline/patient-timeline";

import type { PatientTimelineEvent } from "@/types/patient-timeline";

type OverviewTabProps = {
  patient: Patient;

  lastVisit: Date | null;

  timeline: PatientTimelineEvent[];

  outstandingBalance: number;
};

export function OverviewTab({
  patient,
  lastVisit,
  timeline,
  outstandingBalance,
}: OverviewTabProps) {
  const hasOutstandingBalance = outstandingBalance > 0;

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      {/* LEFT CONTENT */}

      <div className="space-y-6 xl:col-span-2">
        {/* MEDICAL OVERVIEW */}

        <Card className="p-5">
          <div className="mb-5">
            <h2 className="section-title">Medical Overview</h2>

            <p className="helper-text">General patient information</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* BLOOD GROUP */}

            <div>
              <p className="helper-text">Blood Group</p>

              <p className="mt-1 font-medium">{patient.bloodGroup}</p>
            </div>

            {/* GENDER */}

            <div>
              <p className="helper-text">Gender</p>

              <p className="mt-1 font-medium capitalize">{patient.gender}</p>
            </div>

            {/* EMERGENCY CONTACT */}

            <div>
              <p className="helper-text">Emergency Contact</p>

              <p className="mt-1 font-medium">{patient.emergencyContact}</p>
            </div>

            {/* LAST VISIT */}

            <div>
              <p className="helper-text">Last Visit</p>

              <p className="mt-1 font-medium">
                {lastVisit ? lastVisit.toLocaleDateString() : "Never"}
              </p>
            </div>
          </div>
        </Card>

        {/* CLINICAL NOTES */}

        <Card className="p-5">
          <div className="mb-5">
            <h2 className="section-title">Clinical Notes</h2>

            <p className="helper-text">Latest doctor and staff notes</p>
          </div>

          <div
            className="
              rounded-2xl border
              border-amber-100
              bg-amber-50 p-4
            "
          >
            <p
              className="
                text-sm leading-7
                text-gray-700
              "
            >
              {patient.notes}
            </p>
          </div>
        </Card>

        {/* TIMELINE */}

        <PatientTimeline events={timeline} />
      </div>

      {/* RIGHT SIDEBAR */}

      <div className="space-y-6">
        {/* QUICK INFO */}

        <Card className="p-5">
          <div className="mb-5">
            <h2 className="section-title">Quick Info</h2>

            <p className="helper-text">Operational patient context</p>
          </div>

          <div className="space-y-5">
            {/* ASSIGNED DOCTOR */}

            <div>
              <p className="helper-text">Assigned Doctor</p>

              <p className="mt-1 font-medium">
                {patient.assignedDoctor
                  ? `Dr. ${patient.assignedDoctor}`
                  : "Not assigned"}
              </p>
            </div>

            {/* OUTSTANDING BALANCE */}

            <div>
              <p className="helper-text">Outstanding Balance</p>

              <p
                className="
                  mt-1 text-xl
                  font-bold
                "
              >
                <span
                  className={
                    hasOutstandingBalance ? "text-red-600" : "text-green-600"
                  }
                >
                  ₹{outstandingBalance.toFixed(2)}
                </span>
              </p>
            </div>

            {/* ACCOUNT CREATED */}

            <div>
              <p className="helper-text">Account Created</p>

              <p className="mt-1 font-medium">{patient.createdAt}</p>
            </div>

            {/* ADDRESS */}

            <div>
              <p className="helper-text">Address</p>

              <p
                className="
                  mt-1 text-sm
                  leading-7 text-gray-700
                "
              >
                {patient.address}
              </p>
            </div>
          </div>
        </Card>

        {/* ALERT CARD */}

        {hasOutstandingBalance && (
          <Card
            className="
              border border-red-100
              bg-red-50 p-5
            "
          >
            <div className="space-y-3">
              <div>
                <h2
                  className="
                    text-base font-semibold
                    text-red-700
                  "
                >
                  Attention Required
                </h2>

                <p
                  className="
                    mt-1 text-sm
                    text-red-600
                  "
                >
                  Outstanding balance pending for this patient.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
