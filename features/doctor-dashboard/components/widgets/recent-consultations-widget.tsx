import { DashboardWidget } from "@/components/dashboard/dashboard-widget";

type RecentConsultationsWidgetProps = {
  consultations: {
    id: string;
    patientName: string;
    reason: string;
  }[];
};

export function RecentConsultationsWidget({
  consultations,
}: RecentConsultationsWidgetProps) {
  return (
    <DashboardWidget
      title="Recent Consultations"
      description="Recently completed consultations"
    >
      <div className="space-y-4">
        {consultations.map((consultation) => (
          <div
            key={consultation.id}
            className="
                rounded-2xl border
                border-gray-200 p-4
              "
          >
            <div
              className="
                  flex items-start
                  justify-between gap-4
                "
            >
              <div>
                <h3
                  className="
                      text-sm font-semibold
                      text-gray-900
                    "
                >
                  {consultation.patientName}
                </h3>

                <p
                  className="
                      mt-1 text-sm
                      text-gray-500
                    "
                >
                  {consultation.reason}
                </p>
              </div>

              <div
                className="
                    rounded-xl bg-green-50
                    px-3 py-2 text-sm
                    font-medium text-green-700
                  "
              >
                Completed
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardWidget>
  );
}
