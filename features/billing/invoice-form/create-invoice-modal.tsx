"use client";

import { X } from "lucide-react";

import { Patient } from "@/types/patient";

import { Button } from "@/components/ui/button";

import { InvoiceForm } from "./invoice-form";

type CreateInvoiceModalProps = {
  open: boolean;

  onClose: () => void;

  patients: Patient[];

  initialPatientId?: string;
};

export function CreateInvoiceModal({
  open,
  onClose,
  patients,
  initialPatientId,
}: CreateInvoiceModalProps) {
  if (!open) return null;

  return (
    <>
      {/* BACKDROP */}

      <div
        className="
          fixed inset-0 z-40
          bg-black/40
        "
        onClick={onClose}
      />

      {/* MODAL */}

      <div
        className="
          fixed left-1/2 top-1/2
          z-50

          h-[90vh]
          w-full
          max-w-5xl

          -translate-x-1/2
          -translate-y-1/2

          overflow-hidden

          rounded-2xl
          border border-gray-200
          bg-white
          shadow-xl
        "
      >
        {/* HEADER */}

        <div
          className="
            flex items-center
            justify-between

            border-b
            border-gray-200

            px-6 py-4
          "
        >
          <div>
            <h2
              className="
                text-xl font-semibold
                text-gray-900
              "
            >
              Create Invoice
            </h2>

            <p
              className="
                mt-1 text-sm
                text-gray-500
              "
            >
              Generate a new patient invoice.
            </p>
          </div>

          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>

        {/* BODY */}

        <div
          className="
            h-[calc(90vh-80px)]
            overflow-y-auto

            p-6
          "
        >
          <InvoiceForm
            patients={patients}
            initialPatientId={initialPatientId}
            onSuccess={onClose}
          />
        </div>
      </div>
    </>
  );
}
