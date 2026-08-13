"use client";

import { Download, Eye, RotateCcw } from "lucide-react";

type InvoiceActionsProps = {
  invoiceId: string;

  onView: () => void;
};

export function InvoiceActions({ invoiceId, onView }: InvoiceActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {/* VIEW */}

      <button
        onClick={onView}
        className="
          rounded-lg p-2
          text-gray-400
          transition-colors
          hover:bg-gray-100
          hover:text-gray-700
        "
      >
        <Eye size={16} />
      </button>

      {/* DOWNLOAD */}

      <button
        onClick={() => console.log("Download invoice:", invoiceId)}
        className="
          rounded-lg p-2
          text-gray-400
          transition-colors
          hover:bg-gray-100
          hover:text-gray-700
        "
      >
        <Download size={16} />
      </button>

      {/* REFUND */}

      <button
        onClick={() => console.log("Refund invoice:", invoiceId)}
        className="
          rounded-lg p-2
          text-gray-400
          transition-colors
          hover:bg-red-50
          hover:text-red-600
        "
      >
        <RotateCcw size={16} />
      </button>
    </div>
  );
}
