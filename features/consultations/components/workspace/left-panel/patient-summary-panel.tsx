import { Card } from "@/components/ui/card";

import { Patient } from "@/types/patient";

type PatientSummaryPanelProps = {
  patient: Patient;
};

export function PatientSummaryPanel({ patient }: PatientSummaryPanelProps) {
  return (
    <Card className="p-5">
      <div className="mb-5">
        <h2 className="section-title">Patient Summary</h2>

        <p className="helper-text">Quick clinical overview</p>
      </div>

      <div className="space-y-5">
        <div>
          <p className="helper-text">Blood Group</p>

          <p className="mt-1 font-medium">
            {patient.bloodGroup ?? "Not specified"}
          </p>
        </div>

        <div>
          <p className="helper-text">Last Visit</p>

          <p className="mt-1 font-medium">
            {patient.lastVisit
              ? new Date(patient.lastVisit).toLocaleDateString()
              : "No previous visit"}
          </p>
        </div>

        <div>
          <p className="helper-text">Notes</p>

          <p
            className="
              mt-1 text-sm
              leading-7 text-gray-700
            "
          >
            {patient.notes ?? "No notes available"}
          </p>
        </div>
      </div>
    </Card>
  );
}
