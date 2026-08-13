"use client";

import { Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";

import type { UseFormRegister } from "react-hook-form";
import type { InvoiceFormValues } from "@/validations/invoice.schema";

type InvoiceItemRowProps = {
  index: number;
  onRemove: () => void;
  register: UseFormRegister<InvoiceFormValues>;
  total?: number;
};

export function InvoiceItemRow({
  index,
  onRemove,
  register,
  total = 0,
}: InvoiceItemRowProps) {
  return (
    <div
      className="
        rounded-xl
        border border-gray-200
        bg-white p-4
      "
    >
      <div
        className="
          mb-4 flex items-center
          justify-between
        "
      >
        <h4
          className="
            text-sm font-semibold
            text-gray-900
          "
        >
          Service Item #{index + 1}
        </h4>

        <button
          type="button"
          onClick={onRemove}
          className="
            rounded-lg p-2
            text-gray-400
            transition-colors

            hover:bg-red-50
            hover:text-red-600
          "
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div
        className="
          grid gap-4
          md:grid-cols-4
        "
      >
        {/* SERVICE NAME */}

        <div className="md:col-span-2">
          <p className="mb-2 label-text">Service Name</p>

          <Input
            placeholder="Consultation"
            {...register(`items.${index}.name`)}
          />
        </div>

        {/* QUANTITY */}

        <div>
          <p className="mb-2 label-text">Quantity</p>

          <Input
            type="number"
            min={1}
            {...register(`items.${index}.quantity`, {
              valueAsNumber: true,
            })}
          />
        </div>

        {/* PRICE */}

        <div>
          <p className="mb-2 label-text">Unit Price</p>

          <Input
            type="number"
            min={0}
            {...register(`items.${index}.price`, {
              valueAsNumber: true,
            })}
          />
        </div>
      </div>

      {/* ROW TOTAL */}

      <div
        className="
          mt-4 flex
          justify-end
        "
      >
        <div
          className="
            rounded-lg
            bg-gray-50
            px-4 py-2
          "
        >
          <span
            className="
              text-xs text-gray-500
            "
          >
            Row Total
          </span>

          <p
            className="
              text-sm font-semibold
              text-gray-900
            "
          >
            ₹{total.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
