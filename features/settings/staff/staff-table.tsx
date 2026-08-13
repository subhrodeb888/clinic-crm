"use client";

import { staff } from "@/mock/staff";

import { DataTable } from "@/components/tables/data-table";

import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";

import { staffColumns } from "./staff-columns";

export function StaffTable() {
  return (
    <DataTable
      data={staff}
      columns={staffColumns}
      toolbar={(table) => (
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
              <p className="mb-2 label-text">Search Staff</p>

              <SearchInput
                placeholder="Search staff..."
                className="h-11"
                onChange={(e) =>
                  table.getColumn("name")?.setFilterValue(e.target.value)
                }
              />
            </div>

            {/* FILTERS */}

            <div className="flex gap-3">
              <div>
                <p className="mb-2 label-text">Role</p>

                <Select
                  className="w-[180px]"
                  onChange={(e) =>
                    table.getColumn("role")?.setFilterValue(e.target.value)
                  }
                >
                  <option value="">All Roles</option>

                  <option value="admin">Admin</option>

                  <option value="doctor">Doctor</option>

                  <option value="receptionist">Receptionist</option>
                </Select>
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
}
