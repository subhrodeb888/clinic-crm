import { Card } from "@/components/ui/card";

const prescriptions = [
  {
    id: 1,
    medicine: "Paracetamol",
    dosage: "500mg",
    frequency: "Twice Daily",
    doctor: "Dr. Amit Roy",
    date: "2026-05-10",
  },

  {
    id: 2,
    medicine: "Cetirizine",
    dosage: "10mg",
    frequency: "Once Daily",
    doctor: "Dr. Priya Sen",
    date: "2026-04-22",
  },
];

export function PrescriptionsTab() {
  return (
    <Card className="p-5">
      <div className="mb-6">
        <h2 className="section-title">Prescriptions</h2>

        <p className="helper-text">Patient medication history</p>
      </div>

      <div className="space-y-4">
        {prescriptions.map((prescription) => (
          <div
            key={prescription.id}
            className="
                rounded-2xl border
                border-gray-200 p-5
              "
          >
            <div
              className="
                  flex flex-col gap-4
                  lg:flex-row
                  lg:items-start
                  lg:justify-between
                "
            >
              {/* LEFT */}

              <div className="space-y-2">
                <h3
                  className="
                      text-lg font-semibold
                      text-gray-900
                    "
                >
                  {prescription.medicine}
                </h3>

                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    Dosage: {prescription.dosage}
                  </p>

                  <p className="text-sm text-gray-600">
                    Frequency: {prescription.frequency}
                  </p>

                  <p className="text-sm text-gray-600">
                    Prescribed By: {prescription.doctor}
                  </p>
                </div>
              </div>

              {/* RIGHT */}

              <div
                className="
                    rounded-xl bg-gray-100
                    px-3 py-2 text-sm
                    font-medium text-gray-700
                  "
              >
                {prescription.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
