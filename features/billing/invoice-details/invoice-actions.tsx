"use client";

import { Download, Printer, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Invoice } from "@/types/invoice";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { updateInvoiceStatus } from "@/actions/billing/update-invoice-status";

import { InvoiceStatus } from "@/types/enums";

type InvoiceActionsProps = {
  invoice: Invoice;
};

export function InvoiceActions({ invoice }: InvoiceActionsProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [status, setStatus] = useState<InvoiceStatus>(invoice.status);
  function handleDownload() {
    console.log("Download invoice:", invoice.id);
  }

  function handlePrint() {
    console.log("Print invoice:", invoice.id);
  }

  function handleRefund() {
    console.log("Refund invoice:", invoice.id);
  }

  function handleUpdateStatus() {
    startTransition(async () => {
      await updateInvoiceStatus(invoice.id, status);

      router.refresh();
    });
  }

  return (
    <div
      className="
        flex flex-col gap-3

        sm:flex-row
        sm:justify-end
      "
    >
      {/* DOWNLOAD */}

      <Button variant="outline" onClick={handleDownload}>
        <Download size={16} className="mr-2" />
        Download
      </Button>

      {/* PRINT */}

      <Button variant="outline" onClick={handlePrint}>
        <Printer size={16} className="mr-2" />
        Print
      </Button>

      {/* REFUND */}

      <div className="flex items-center gap-2">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as InvoiceStatus)}
          className="
      rounded-lg
      border
      border-gray-300
      px-3
      py-2
      text-sm
    "
        >
          <option value="pending">Pending</option>
          <option value="partial">Partial</option>
          <option value="paid">Paid</option>
          <option value="refunded">Refunded</option>
        </select>

        <Button onClick={handleUpdateStatus} disabled={isPending}>
          {isPending ? "Updating..." : "Update Status"}
        </Button>
      </div>
    </div>
  );
}
