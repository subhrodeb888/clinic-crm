import { Card } from "@/components/ui/card";

type BillingKPIsProps = {
  kpis: {
    totalRevenue: number;
    pendingRevenue: number;
    paidInvoices: number;
    refundedInvoices: number;
  };
};

export function BillingKPIs({ kpis }: BillingKPIsProps) {
  const { totalRevenue, pendingRevenue, paidInvoices, refundedInvoices } = kpis;

  return (
    <div
      className="
        mb-6
        grid gap-4
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      {/* TOTAL REVENUE */}

      <Card>
        <p
          className="
            text-sm font-medium
            text-gray-500
          "
        >
          Total Revenue
        </p>

        <h3
          className="
            mt-2
            text-3xl font-bold
            text-gray-900
          "
        >
          ₹{totalRevenue.toLocaleString()}
        </h3>

        <p
          className="
            mt-2 text-xs
            text-gray-500
          "
        >
          All invoices combined
        </p>
      </Card>

      {/* PENDING REVENUE */}

      <Card>
        <p
          className="
            text-sm font-medium
            text-gray-500
          "
        >
          Pending Revenue
        </p>

        <h3
          className="
            mt-2
            text-3xl font-bold
            text-yellow-600
          "
        >
          ₹{pendingRevenue.toLocaleString()}
        </h3>

        <p
          className="
            mt-2 text-xs
            text-gray-500
          "
        >
          Pending + partial payments
        </p>
      </Card>

      {/* PAID INVOICES */}

      <Card>
        <p
          className="
            text-sm font-medium
            text-gray-500
          "
        >
          Paid Invoices
        </p>

        <h3
          className="
            mt-2
            text-3xl font-bold
            text-green-600
          "
        >
          {paidInvoices}
        </h3>

        <p
          className="
            mt-2 text-xs
            text-gray-500
          "
        >
          Successfully collected
        </p>
      </Card>

      {/* REFUNDED INVOICES */}

      <Card>
        <p
          className="
            text-sm font-medium
            text-gray-500
          "
        >
          Refunded Invoices
        </p>

        <h3
          className="
            mt-2
            text-3xl font-bold
            text-gray-600
          "
        >
          {refundedInvoices}
        </h3>

        <p
          className="
            mt-2 text-xs
            text-gray-500
          "
        >
          Refunded transactions
        </p>
      </Card>
    </div>
  );
}
