import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

type OperationalOverviewProps = {
  data: {
    waitingPatients: number;
    doctorsAvailable: number;
    completedConsultations: number;
  };
};

export function OperationalOverview({ data }: OperationalOverviewProps) {
  return (
    <Card>
      <SectionHeader title="Operational Overview" />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="table-text">Waiting Patients</span>

          <span className="font-semibold">{data.waitingPatients}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="table-text">Doctors Available</span>

          <span className="font-semibold">{data.doctorsAvailable}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="table-text">Completed Consultations</span>

          <span className="font-semibold">{data.completedConsultations}</span>
        </div>
      </div>
    </Card>
  );
}
