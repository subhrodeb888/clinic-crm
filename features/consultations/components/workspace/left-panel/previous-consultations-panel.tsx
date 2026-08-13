import { Card } from "@/components/ui/card";

type PreviousConsultationsPanelProps = {
  consultations: {
    id: string;
    date: string;
    reason: string;
  }[];
};

export function PreviousConsultationsPanel({
  consultations,
}: PreviousConsultationsPanelProps) {
  return (
    <Card className="p-5">
      <div className="mb-5">
        <h2 className="section-title">Previous Consultations</h2>
      </div>

      <div className="space-y-4">
        {consultations.map((consultation) => (
          <div
            key={consultation.id}
            className="
              rounded-xl border
              border-gray-200 p-4
            "
          >
            <div className="space-y-1">
              <p className="font-medium">{consultation.date}</p>

              <p className="text-sm text-gray-500">{consultation.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
