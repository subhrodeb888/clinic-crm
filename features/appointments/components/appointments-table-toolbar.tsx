"use client";

import { Table } from "@tanstack/react-table";

import { SearchInput } from "@/components/ui/search-input";

import { Select } from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import { Appointment } from "@/types/appointment";

type AppointmentsTableToolbarProps = {
  table: Table<Appointment>;
};

export function AppointmentsTableToolbar({
  table,
}: AppointmentsTableToolbarProps) {
  return (
    <div
      className="
        mb-6 flex flex-col gap-4
        lg:flex-row lg:items-center
        lg:justify-between
      "
    >
      {/* SEARCH */}

      <div className="w-full max-w-sm">
        <SearchInput
          placeholder="Search patients..."
          onChange={(e) =>
            table.getColumn("patient")?.setFilterValue(e.target.value)
          }
        />
      </div>

      {/* FILTERS */}

      <div className="flex flex-wrap gap-3">
        {/* DOCTOR FILTER */}

        <Select
          className="w-[180px]"
          onChange={(e) =>
            table.getColumn("doctor")?.setFilterValue(e.target.value)
          }
        >
          <option value="">All Doctors</option>

          <option value="Amit">Dr. Amit Roy</option>

          <option value="Priya">Dr. Priya Sen</option>
        </Select>

        {/* STATUS FILTER */}

        <Select
          className="w-[180px]"
          onChange={(e) =>
            table.getColumn("status")?.setFilterValue(e.target.value)
          }
        >
          <option value="">All Statuses</option>

          <option value="scheduled">Scheduled</option>

          <option value="completed">Completed</option>

          <option value="cancelled">Cancelled</option>
        </Select>

        {/* DATE FILTER */}

        <Input
          type="date"
          className="w-[180px]"
          onChange={(e) =>
            table.getColumn("appointmentDate")?.setFilterValue(e.target.value)
          }
        />
      </div>
    </div>
  );
}
