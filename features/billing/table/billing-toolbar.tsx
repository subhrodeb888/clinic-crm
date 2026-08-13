"use client";

import { useState } from "react";

import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";

import { Patient } from "@/types/patient";
import { Invoice } from "@/types/invoice";

import { CreateInvoiceModal } from "../invoice-form/create-invoice-modal";

type BillingToolbarProps = {
  table: Table<Invoice>;

  patients: Patient[];

  initialPatientId?: string;
};

export function BillingToolbar({
  table,
  patients,
  initialPatientId,
}: BillingToolbarProps) {
  const [open, setOpen] = useState(Boolean(initialPatientId));

  return (
    <>
      <div
        className="
          mb-6 rounded-2xl
          border border-gray-200
          bg-white p-4
        "
      >
        <div
          className="
            flex flex-col gap-4
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          {/* SEARCH */}

          <div className="w-full max-w-md">
            <p className="mb-2 label-text">Search Invoice</p>

            <SearchInput
              placeholder="Search patient name..."
              className="h-11"
              onChange={(e) =>
                table.getColumn("patient")?.setFilterValue(e.target.value)
              }
            />
          </div>

          {/* FILTERS + ACTIONS */}

          <div className="flex flex-wrap items-end gap-3">
            {/* STATUS */}

            <div>
              <p className="mb-2 label-text">Status</p>

              <Select
                className="w-[180px]"
                onChange={(e) =>
                  table.getColumn("status")?.setFilterValue(e.target.value)
                }
              >
                <option value="">All Statuses</option>

                <option value="paid">Paid</option>

                <option value="pending">Pending</option>

                <option value="partial">Partial</option>

                <option value="refunded">Refunded</option>
              </Select>
            </div>

            {/* PAYMENT METHOD */}

            <div>
              <p className="mb-2 label-text">Payment Method</p>

              <Select
                className="w-[180px]"
                onChange={(e) =>
                  table
                    .getColumn("paymentMethod")
                    ?.setFilterValue(e.target.value)
                }
              >
                <option value="">All Methods</option>

                <option value="cash">Cash</option>

                <option value="upi">UPI</option>

                <option value="card">Card</option>

                <option value="bank_transfer">Bank Transfer</option>
              </Select>
            </div>

            {/* CREATE INVOICE */}

            <Button onClick={() => setOpen(true)}>Create Invoice</Button>
          </div>
        </div>
      </div>

      <CreateInvoiceModal
        open={open}
        onClose={() => setOpen(false)}
        patients={patients}
        initialPatientId={initialPatientId}
      />
    </>
  );
}
