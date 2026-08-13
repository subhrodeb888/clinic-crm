import { Card } from "@/components/ui/card";

type PatientSummaryCardsProps = {
  totalAppointments: number;

  prescriptions: number;

  lastVisit: string;

  outstandingBalance: number;
};

export function PatientSummaryCards({
  totalAppointments,
  prescriptions,
  lastVisit,
  outstandingBalance,
}: PatientSummaryCardsProps) {
  const cards = [
    {
      label: "Appointments",
      value: totalAppointments,
    },

    {
      label: "Outstanding Balance",
      value: `₹${outstandingBalance.toFixed(2)}`,
    },

    {
      label: "Prescriptions",
      value: prescriptions,
    },

    {
      label: "Last Visit",
      value: lastVisit,
    },
  ];

  return (
    <div
      className="
        grid gap-5
        md:grid-cols-2
        xl:grid-cols-4
      "
    >
      {cards.map((card) => (
        <Card key={card.label} className="p-5">
          <p className="helper-text">{card.label}</p>

          <p
            className="
              mt-2 text-2xl
              font-bold text-gray-900
            "
          >
            {card.value}
          </p>
        </Card>
      ))}
    </div>
  );
}
