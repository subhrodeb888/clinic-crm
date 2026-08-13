"use client";

import { Table } from "@tanstack/react-table";

import { Reminder } from "@/types/reminder";

import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";

type ReminderToolbarProps = {
  table: Table<Reminder>;
};

export function ReminderToolbar({ table }: ReminderToolbarProps) {
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
          <p className="mb-2 label-text">Search Patient</p>

          <SearchInput
            placeholder="Search patient..."
            className="h-11"
            onChange={(e) =>
              table.getColumn("patient")?.setFilterValue(e.target.value)
            }
          />
        </div>

        {/* FILTERS */}

        <div className="flex flex-wrap gap-3">
          {/* TYPE FILTER */}

          <div>
            <p className="mb-2 label-text">Reminder Type</p>

            <Select
              className="w-[180px]"
              onChange={(e) =>
                table.getColumn("type")?.setFilterValue(e.target.value)
              }
            >
              <option value="">All Types</option>

              <option value="appointment">Appointment</option>

              <option value="follow_up">Follow Up</option>

              <option value="payment">Payment</option>
            </Select>
          </div>

          {/* STATUS FILTER */}

          <div>
            <p className="mb-2 label-text">Status</p>

            <Select
              className="w-[180px]"
              onChange={(e) =>
                table.getColumn("status")?.setFilterValue(e.target.value)
              }
            >
              <option value="">All Statuses</option>

              <option value="sent">Sent</option>

              <option value="pending">Pending</option>

              <option value="failed">Failed</option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
