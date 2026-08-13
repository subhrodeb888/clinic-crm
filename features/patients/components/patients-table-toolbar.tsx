"use client";

import { Table } from "@tanstack/react-table";

import { SearchInput } from "@/components/ui/search-input";

import { Select } from "@/components/ui/select";

import { Patient } from "@/types/patient";

type PatientsTableToolbarProps = {
  table: Table<Patient>;
};

export function PatientsTableToolbar({ table }: PatientsTableToolbarProps) {
  return (
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
          <p className="mb-2 label-text">Search Patients</p>

          <SearchInput
            placeholder="Search patient name..."
            className="h-11"
            onChange={(e) =>
              table.getColumn("name")?.setFilterValue(e.target.value)
            }
          />
        </div>

        {/* FILTERS */}

        <div className="flex flex-wrap gap-3">
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

              <option value="active">Active</option>

              <option value="follow_up">Follow Up</option>

              <option value="high_risk">High Risk</option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
