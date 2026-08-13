import { Card } from "@/components/ui/card";

import type { Invoice } from "@/types/invoice";

type BillingTabProps = {
  invoices: Invoice[];
};

export function BillingTab({ invoices }: BillingTabProps) {
  return (
    <Card className="p-5">
      <div className="mb-6">
        <h2 className="section-title">Billing History</h2>

        <p className="helper-text">Patient invoice records</p>
      </div>

      <div className="space-y-4">
        {invoices.length === 0 ? (
          <div className="py-8 text-center text-sm text-gray-500">
            No invoices found.
          </div>
        ) : (
          invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="
          flex flex-col gap-4
          rounded-2xl border
          border-gray-200 p-5
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
            >
              {/* LEFT */}

              <div className="space-y-1">
                <h3 className="font-semibold">
                  Invoice #{invoice.id.slice(0, 8)}
                </h3>

                <p className="text-sm text-gray-500">
                  {new Date(invoice.issuedAt).toLocaleDateString()}
                </p>
              </div>

              {/* RIGHT */}

              <div className="flex items-center gap-4">
                <p className="text-lg font-bold text-gray-900">
                  ₹{invoice.total.toFixed(2)}
                </p>

                <div
                  className={`
              rounded-xl px-3 py-2 text-sm font-medium
              ${
                invoice.status === "paid"
                  ? "bg-green-50 text-green-700"
                  : invoice.status === "partial"
                    ? "bg-yellow-50 text-yellow-700"
                    : invoice.status === "pending"
                      ? "bg-red-50 text-red-700"
                      : "bg-gray-100 text-gray-700"
              }
            `}
                >
                  {invoice.status.toUpperCase()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
