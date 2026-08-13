"use client";
import { getInvoice } from "@/actions/billing/get-invoice";

import { useState } from "react";

import { Invoice } from "@/types/invoice";

import { DataTable } from "@/components/tables/data-table";

import { BillingToolbar } from "./billing-toolbar";

import { getBillingColumns } from "./billing-columns";

import { InvoiceDetailsDrawer } from "../invoice-details/invoice-details-drawer";
import { Patient } from "@/types/patient";

type BillingTableProps = {
  invoices: Invoice[];
  patients: Patient[];
  initialPatientId?: string;
};

export function BillingTable({
  invoices,
  patients,
  initialPatientId,
}: BillingTableProps) {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  async function handleViewInvoice(invoice: Invoice) {
    try {
      const fullInvoice = await getInvoice(invoice.id);

      setSelectedInvoice(fullInvoice);

      setDrawerOpen(true);
    } catch (error) {
      console.error("Failed to load invoice details", error);
    }
  }

  return (
    <>
      <DataTable
        columns={getBillingColumns(handleViewInvoice)}
        data={invoices}
        toolbar={(table) => (
          <BillingToolbar
            table={table}
            patients={patients}
            initialPatientId={initialPatientId}
          />
        )}
      />

      <InvoiceDetailsDrawer
        open={drawerOpen}
        invoice={selectedInvoice}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
