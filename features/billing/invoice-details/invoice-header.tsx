import { InvoiceStatusBadge } from "../table/invoice-status-badge";

import { Invoice } from "@/types/invoice";

type InvoiceHeaderProps = {
  invoice: Invoice;
};

export function InvoiceHeader({ invoice }: InvoiceHeaderProps) {
  return (
    <div
      className="
        flex flex-col gap-4
        border-b border-gray-200
        pb-6

        md:flex-row
        md:items-center
        md:justify-between
      "
    >
      {/* LEFT */}

      <div>
        <h2
          className="
            text-2xl font-bold
            text-gray-900
          "
        >
          {invoice.id}
        </h2>

        <p
          className="
            mt-1 text-sm
            text-gray-500
          "
        >
          Issued on {invoice.issuedAt}
        </p>
      </div>

      {/* RIGHT */}

      <div
        className="
          flex flex-wrap
          items-center gap-3
        "
      >
        <InvoiceStatusBadge status={invoice.status} />

        <div
          className="
            rounded-lg
            bg-gray-100

            px-3 py-2

            text-sm
            font-medium
            text-gray-700
          "
        >
          {invoice.paymentMethod.replace("_", " ").toUpperCase()}
        </div>
      </div>
    </div>
  );
}
