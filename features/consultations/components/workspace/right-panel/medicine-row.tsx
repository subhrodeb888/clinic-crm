"use client";

import { Trash2 } from "lucide-react";

import { UseFormRegister } from "react-hook-form";

import { PrescriptionSchema } from "@/lib/validations/prescription-schema";

type MedicineRowProps = {
  index: number;

  register: UseFormRegister<PrescriptionSchema>;

  remove: (index: number) => void;

  disabled: boolean;
};

export function MedicineRow({
  index,
  register,
  remove,
  disabled,
}: MedicineRowProps) {
  return (
    <div
      className="
        rounded-2xl
        border border-gray-200
        bg-white
        p-5
      "
    >
      {/* HEADER */}

      <div
        className="
          mb-5
          flex items-center
          justify-between
        "
      >
        <h3
          className="
            text-sm
            font-semibold
            text-gray-900
          "
        >
          Medicine #{index + 1}
        </h3>

        <button
          type="button"
          disabled={disabled}
          onClick={() => remove(index)}
          className="
            text-red-500
            hover:text-red-600
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* GRID */}

      <div
        className="
          grid gap-4
          md:grid-cols-2
        "
      >
        <input
          disabled={disabled}
          placeholder="Medicine"
          {...register(`medicines.${index}.medicine`)}
          className="
            rounded-xl
            border border-gray-300
            px-4 py-3
            outline-none
            focus:border-blue-500
            disabled:bg-gray-100
            disabled:text-gray-500
            disabled:cursor-not-allowed
          "
        />

        <input
          disabled={disabled}
          placeholder="Dosage"
          {...register(`medicines.${index}.dosage`)}
          className="
            rounded-xl
            border border-gray-300
            px-4 py-3
            outline-none
            focus:border-blue-500
            disabled:bg-gray-100
            disabled:text-gray-500
            disabled:cursor-not-allowed
          "
        />

        <input
          disabled={disabled}
          placeholder="Frequency"
          {...register(`medicines.${index}.frequency`)}
          className="
            rounded-xl
            border border-gray-300
            px-4 py-3
            outline-none
            focus:border-blue-500
            disabled:bg-gray-100
            disabled:text-gray-500
            disabled:cursor-not-allowed
          "
        />

        <input
          disabled={disabled}
          placeholder="Duration (days)"
          {...register(`medicines.${index}.duration`)}
          className="
            rounded-xl
            border border-gray-300
            px-4 py-3
            outline-none
            focus:border-blue-500
            disabled:bg-gray-100
            disabled:text-gray-500
            disabled:cursor-not-allowed
          "
        />
      </div>

      <textarea
        disabled={disabled}
        placeholder="Instructions"
        {...register(`medicines.${index}.instructions`)}
        className="
          mt-4
          min-h-[100px]
          w-full
          rounded-xl
          border border-gray-300
          px-4 py-3
          outline-none
          focus:border-blue-500
          disabled:bg-gray-100
          disabled:text-gray-500
          disabled:cursor-not-allowed
        "
      />
    </div>
  );
}
