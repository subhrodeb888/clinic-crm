"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Staff } from "@/types/staff";

import { RoleBadge } from "./role-badge";
import { PermissionIndicator } from "./permission-indicator";
import { StaffActions } from "./staff-actions";

export const staffColumns: ColumnDef<Staff>[] = [
  {
    accessorKey: "name",

    header: "Staff Member",

    cell: ({ row }) => {
      const staff = row.original;

      return (
        <div className="space-y-1">
          <p
            className="
                text-sm font-semibold
                text-gray-900
              "
          >
            {staff.name}
          </p>

          <p
            className="
                text-xs text-gray-500
              "
          >
            {staff.email}
          </p>
        </div>
      );
    },
  },

  {
    accessorKey: "phone",

    header: "Phone",

    cell: ({ row }) => (
      <span className="font-medium">{row.original.phone}</span>
    ),
  },

  {
    accessorKey: "role",

    header: "Role",

    cell: ({ row }) => <RoleBadge role={row.original.role} />,
  },

  {
    id: "permissions",

    header: "Permissions",

    enableSorting: false,

    cell: ({ row }) => <PermissionIndicator role={row.original.role} />,
  },

  {
    accessorKey: "active",

    header: "Status",

    cell: ({ row }) => (
      <span
        className={`
            rounded-full
            px-2 py-1
            text-xs font-medium

            ${
              row.original.active
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          `}
      >
        {row.original.active ? "Active" : "Inactive"}
      </span>
    ),
  },

  {
    id: "actions",

    header: "",

    enableSorting: false,

    cell: ({ row }) => <StaffActions staffId={row.original.id} />,
  },
];
