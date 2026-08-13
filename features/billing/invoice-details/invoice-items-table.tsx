import { Invoice } from "@/types/invoice";

type InvoiceItemsTableProps = {
  invoice: Invoice;
};

export function InvoiceItemsTable({ invoice }: InvoiceItemsTableProps) {
  return (
    <div
      className="
        overflow-hidden
        rounded-xl
        border border-gray-200
      "
    >
      <table className="w-full">
        <thead>
          <tr
            className="
              border-b border-gray-200
              bg-gray-50
            "
          >
            <th
              className="
                px-4 py-3 text-left
                text-xs font-semibold
                uppercase tracking-wide
                text-gray-500
              "
            >
              Service
            </th>

            <th
              className="
                px-4 py-3 text-center
                text-xs font-semibold
                uppercase tracking-wide
                text-gray-500
              "
            >
              Qty
            </th>

            <th
              className="
                px-4 py-3 text-right
                text-xs font-semibold
                uppercase tracking-wide
                text-gray-500
              "
            >
              Price
            </th>

            <th
              className="
                px-4 py-3 text-right
                text-xs font-semibold
                uppercase tracking-wide
                text-gray-500
              "
            >
              Total
            </th>
          </tr>
        </thead>

        <tbody>
          {(invoice.items ?? []).map((item) => {
            const rowTotal = item.quantity * item.price;

            return (
              <tr
                key={item.id}
                className="
                  border-b border-gray-100
                  last:border-b-0
                "
              >
                {/* SERVICE */}

                <td className="px-4 py-4">
                  <div>
                    <p
                      className="
                        font-medium
                        text-gray-900
                      "
                    >
                      {item.name}
                    </p>
                  </div>
                </td>

                {/* QTY */}

                <td
                  className="
                    px-4 py-4
                    text-center
                    text-gray-700
                  "
                >
                  {item.quantity}
                </td>

                {/* PRICE */}

                <td
                  className="
                    px-4 py-4
                    text-right
                    text-gray-700
                  "
                >
                  ₹{item.price.toLocaleString()}
                </td>

                {/* TOTAL */}

                <td
                  className="
                    px-4 py-4
                    text-right
                    font-semibold
                    text-gray-900
                  "
                >
                  ₹{rowTotal.toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
