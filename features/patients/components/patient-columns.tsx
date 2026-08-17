"use client"; // Enable client-side rendering

import { ColumnDef } from "@tanstack/react-table"; // Type for table column definitions

import { Patient } from "@/types/patient"; // Patient data type

import { PatientStatusBadge } from "./patient-status-badge"; // Status badge component

import { PatientActions } from "./patient-actions"; // Action buttons component

export const patientColumns: ColumnDef<Patient>[] = [
  // Define columns for patient table
  {
    // Column 1: Patient name + email
    accessorKey: "name", // Key for filtering/sorting
    header: "Patient", // Column header text
    cell: ({ row }) => {
      // Custom render
      const patient = row.original; // Get patient data from row
      return (
        // Show full name and email
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-900">
            {patient.firstName} {patient.lastName}
          </p>
          <p className="text-xs text-gray-500">{patient.email}</p>
        </div>
      );
    },
    filterFn: (row, _, value) => {
      // Custom search filter
      const patient = row.original; // Get patient data
      const fullName = `${patient.firstName} ${patient.lastName}`; // Combine names
      return fullName.toLowerCase().includes(String(value).toLowerCase()); // Case-insensitive match
    },
  },

  {
    // Column 2: Phone number
    accessorKey: "phone",
    header: "Phone",
    cell: (
      { row }, // Show phone with bold style
    ) => <span className="font-medium">{row.original.phone}</span>,
  },

  {
    // Column 3: Last visit date
    accessorKey: "lastVisit",
    header: "Last Visit",
    cell: (
      { row }, // Show date and relative time
    ) => (
      <div className="space-y-1">
        <p className="font-medium">{row.original.lastVisit}</p>
        <p className="text-xs text-gray-500">2 weeks ago</p>{" "}
        {/* Hardcoded example */}
      </div>
    ),
  },

  {
    // Column 4: Assigned doctor
    accessorKey: "assignedDoctor",
    header: "Assigned Doctor",
    cell: (
      { row }, // Show doctor name and department
    ) => (
      <div className="space-y-1">
        <p className="font-medium">{row.original.assignedDoctor}</p>
        <p className="text-xs text-gray-500">Cardiology</p>{" "}
        {/* Hardcoded example */}
      </div>
    ),
  },

  {
    // Column 5: Financial balance
    accessorKey: "balance",
    header: "Outstanding",
    cell: ({ row }) => {
      const balance = row.original.balance; // Get balance amount
      return (
        // Show with color: red if positive, green otherwise
        <span
          className={`font-semibold ${balance > 0 ? "text-red-600" : "text-green-600"}`}
        >
          ₹{balance}
        </span>
      );
    },
  },

  {
    // Column 6: Status badge
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <PatientStatusBadge status={row.original.status} />, // Delegate to badge component
  },

  {
    // Column 7: Action buttons (edit/delete)
    id: "actions", // Unique ID (no accessor)
    header: "", // No header text
    enableSorting: false, // Disable sorting
    enableColumnFilter: false, // Disable filtering
    cell: ({ row }) => <PatientActions patient={row.original} />, // Delegate to actions component
  },
];
