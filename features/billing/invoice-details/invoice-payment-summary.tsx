import { Card } from "@/components/ui/card";

import { Invoice } from "@/types/invoice";

type InvoicePaymentSummaryProps = {
  invoice: Invoice;
};

export function InvoicePaymentSummary({ invoice }: InvoicePaymentSummaryProps) {
  const taxAmount = invoice.total - (invoice.subtotal - invoice.discount);

  return (
    <Card>
      <h3
        className="
          mb-4 text-lg
          font-semibold
          text-gray-900
        "
      >
        Payment Summary
      </h3>

      <div className="space-y-3">
        {/* SUBTOTAL */}

        <SummaryRow label="Subtotal" value={invoice.subtotal} />

        {/* DISCOUNT */}

        <SummaryRow label="Discount" value={invoice.discount} negative />

        {/* TAX */}

        <SummaryRow label="Tax" value={taxAmount} />

        {/* TOTAL */}

        <div
          className="
            mt-4 border-t
            border-gray-200
            pt-4
          "
        >
          <SummaryRow label="Grand Total" value={invoice.total} bold />
        </div>
      </div>
    </Card>
  );
}

type SummaryRowProps = {
  label: string;

  value: number;

  bold?: boolean;

  negative?: boolean;
};

function SummaryRow({
  label,
  value,
  bold = false,
  negative = false,
}: SummaryRowProps) {
  return (
    <div
      className="
        flex items-center
        justify-between
      "
    >
      <span className={bold ? "font-semibold text-gray-900" : "text-gray-600"}>
        {label}
      </span>

      <span
        className={`
          ${bold ? "font-semibold text-gray-900" : "text-gray-700"}

          ${negative ? "text-red-600" : ""}
        `}
      >
        {negative ? "-" : ""}₹{value.toLocaleString()}
      </span>
    </div>
  );
}
