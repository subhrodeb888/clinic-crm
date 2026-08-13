import { Card } from "@/components/ui/card";

type InvoiceSummaryProps = {
  subtotal: number;

  discount: number;

  tax: number;

  total: number;
};

export function InvoiceSummary({
  subtotal,
  discount,
  tax,
  total,
}: InvoiceSummaryProps) {
  return (
    <Card>
      <h3
        className="
          mb-4 text-lg
          font-semibold
        "
      >
        Invoice Summary
      </h3>

      <div className="space-y-3">
        <SummaryRow label="Subtotal" value={subtotal} />

        <SummaryRow label="Discount" value={discount} />

        <SummaryRow label="Tax" value={tax} />

        <div className="border-t pt-3">
          <SummaryRow label="Total" value={total} bold />
        </div>
      </div>
    </Card>
  );
}

type SummaryRowProps = {
  label: string;

  value: number;

  bold?: boolean;
};

function SummaryRow({ label, value, bold }: SummaryRowProps) {
  return (
    <div className="flex justify-between">
      <span className={bold ? "font-semibold" : "text-gray-600"}>{label}</span>

      <span className={bold ? "font-semibold" : ""}>
        ₹{value.toLocaleString()}
      </span>
    </div>
  );
}
