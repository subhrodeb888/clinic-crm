"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Reminder } from "@/types/reminder";

import { ReminderStatusBadge } from "./reminder-status-badge";
import { ReminderTypeBadge } from "./reminder-type-badge";
import { ReminderActions } from "./reminder-actions";

export function getReminderColumns(
  onViewReminder: (reminder: Reminder) => void,
): ColumnDef<Reminder>[] {
  return [
    {
      id: "patient",

      header: "Patient",

      cell: ({ row }) => {
        const reminder = row.original;

        const patient = reminder.patient;

        return (
          <div className="space-y-1">
            <p
              className="
                text-sm font-semibold
                text-gray-900
              "
            >
              {patient
                ? `${patient.firstName} ${patient.lastName}`
                : "Unknown Patient"}
            </p>

            <p
              className="
                text-xs text-gray-500
              "
            >
              {patient?.phone}
            </p>
          </div>
        );
      },

      filterFn: (row, _, value) => {
        const reminder = row.original;

        const patient = reminder.patient;

        const fullName = patient
          ? `${patient.firstName} ${patient.lastName}`
          : "";

        return fullName.toLowerCase().includes(String(value).toLowerCase());
      },
    },

    {
      accessorKey: "type",

      header: "Reminder Type",

      cell: ({ row }) => <ReminderTypeBadge type={row.original.type} />,
    },

    {
      accessorKey: "status",

      header: "Status",

      cell: ({ row }) => <ReminderStatusBadge status={row.original.status} />,
    },

    {
      accessorKey: "scheduledFor",

      header: "Scheduled",

      cell: ({ row }) => (
        <div className="space-y-1">
          <p
            className="
              font-medium
              text-gray-900
            "
          >
            {row.original.scheduledFor}
          </p>

          <p
            className="
              text-xs text-gray-500
            "
          >
            Queued
          </p>
        </div>
      ),
    },

    {
      accessorKey: "sentAt",

      header: "Sent At",

      cell: ({ row }) => (
        <span
          className="
            text-sm
            text-gray-700
          "
        >
          {row.original.sentAt ?? "-"}
        </span>
      ),
    },

    {
      id: "actions",

      header: "",

      enableSorting: false,

      enableColumnFilter: false,

      cell: ({ row }) => (
        <ReminderActions onView={() => onViewReminder(row.original)} />
      ),
    },
  ];
}
