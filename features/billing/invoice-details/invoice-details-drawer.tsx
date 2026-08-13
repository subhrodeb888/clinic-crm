"use client";

import { X } from "lucide-react";

import { Invoice } from "@/types/invoice";

import { Button } from "@/components/ui/button";

import { InvoiceHeader } from "./invoice-header";
import { InvoiceItemsTable } from "./invoice-items-table";
import { InvoicePaymentSummary } from "./invoice-payment-summary";
import { InvoiceActions } from "./invoice-actions";

type InvoiceDetailsDrawerProps = {
  open: boolean;

  invoice: Invoice | null;

  onClose: () => void;
};

export function InvoiceDetailsDrawer({
  open,
  invoice,
  onClose,
}: InvoiceDetailsDrawerProps) {
  if (!open || !invoice) return null;

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

      {/* DRAWER */}

      <div
        className="
          fixed right-0 top-0
          z-50

          h-screen
          w-full
          max-w-4xl

          overflow-hidden

          border-l border-gray-200
          bg-white
          shadow-2xl
        "
      >
        {/* HEADER */}

        <div
          className="
            flex items-center
            justify-between

            border-b border-gray-200

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
              Invoice Details
            </h2>

            <p
              className="
                mt-1 text-sm
                text-gray-500
              "
            >
              Review invoice information and payment summary.
            </p>
          </div>

          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>

        {/* CONTENT */}

        <div
          className="
            h-[calc(100vh-81px)]
            overflow-y-auto

            p-6
          "
        >
          <div className="space-y-6">
            {/* INVOICE HEADER */}

            <InvoiceHeader invoice={invoice} />

            {/* PATIENT INFO */}

            <div
              className="
                rounded-xl
                border border-gray-200
                bg-white
                p-5
              "
            >
              <h3
                className="
                  mb-4 text-lg
                  font-semibold
                  text-gray-900
                "
              >
                Patient Information
              </h3>

              <div
                className="
                  grid gap-4
                  md:grid-cols-2
                "
              >
                <InfoItem
                  label="Patient Name"
                  value={`${invoice.patient.firstName} ${invoice.patient.lastName}`}
                />

                <InfoItem label="Phone" value={invoice.patient.phone} />
              </div>
            </div>

            {/* SERVICES */}

            <div>
              <h3
                className="
                  mb-4 text-lg
                  font-semibold
                  text-gray-900
                "
              >
                Invoice Items
              </h3>

              <InvoiceItemsTable invoice={invoice} />
            </div>

            {/* PAYMENT SUMMARY */}

            <InvoicePaymentSummary invoice={invoice} />

            {/* ACTIONS */}

            <InvoiceActions invoice={invoice} />
          </div>
        </div>
      </div>
    </>
  );
}

type InfoItemProps = {
  label: string;

  value: string;
};

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div>
      <p
        className="
          mb-1 text-xs
          font-medium
          uppercase tracking-wide
          text-gray-500
        "
      >
        {label}
      </p>

      <p
        className="
          text-sm
          font-medium
          text-gray-900
        "
      >
        {value}
      </p>
    </div>
  );
}
