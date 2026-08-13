"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Invoice } from "@/types/invoice";

import { InvoiceStatusBadge } from "./invoice-status-badge";
import { InvoiceActions } from "./invoice-actions";

export function getBillingColumns(
  onViewInvoice: (invoice: Invoice) => void,
): ColumnDef<Invoice>[] {
  return [
    {
      accessorKey: "id",

      header: "Invoice ID",

      cell: ({ row }) => (
        <span
          className="
          font-mono text-sm
          font-semibold
          text-gray-900
        "
        >
          {row.original.id}
        </span>
      ),
    },

    {
      accessorKey: "patient",

      header: "Patient",

      cell: ({ row }) => {
        const patient = row.original.patient;

        return (
          <div className="space-y-1">
            <p
              className="
              text-sm font-semibold
              text-gray-900
            "
            >
              {patient.firstName} {patient.lastName}
            </p>

            <p
              className="
              text-xs text-gray-500
            "
            >
              {patient.phone}
            </p>
          </div>
        );
      },

      filterFn: (row, _, value) => {
        const patient = row.original.patient;

        const fullName = `${patient.firstName} ${patient.lastName}`;

        return fullName.toLowerCase().includes(String(value).toLowerCase());
      },
    },

    {
      accessorKey: "total",

      header: "Amount",

      cell: ({ row }) => (
        <span
          className="
          font-semibold
          text-gray-900
        "
        >
          ₹{row.original.total.toLocaleString()}
        </span>
      ),
    },

    {
      accessorKey: "status",

      header: "Payment Status",

      filterFn: (row, _, value) => {
        if (!value) return true;

        return row.original.status === value;
      },

      cell: ({ row }) => <InvoiceStatusBadge status={row.original.status} />,
    },

    {
      accessorKey: "issuedAt",

      header: "Invoice Date",

      cell: ({ row }) => (
        <div className="space-y-1">
          <p className="font-medium">{row.original.issuedAt}</p>

          <p
            className="
            text-xs text-gray-500
          "
          >
            Issued
          </p>
        </div>
      ),
    },

    {
      accessorKey: "paymentMethod",

      header: "Payment Method",

      filterFn: (row, _, value) => {
        if (!value) return true;

        return row.original.paymentMethod === value;
      },

      cell: ({ row }) => (
        <span
          className="
          capitalize
          font-medium
          text-gray-700
        "
        >
          {row.original.paymentMethod.replace("_", " ")}
        </span>
      ),
    },

    {
      id: "actions",

      header: "",

      enableSorting: false,

      enableColumnFilter: false,

      cell: ({ row }) => (
        <InvoiceActions
          invoiceId={row.original.id}
          onView={() => onViewInvoice(row.original)}
        />
      ),
    },
  ];
}
