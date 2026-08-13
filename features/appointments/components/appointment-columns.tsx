// Mark this file as a Client Component
"use client";

import { Patient } from "@/types/patient";
import { Doctor } from "@/types/doctor";

// Import table column type
import { ColumnDef } from "@tanstack/react-table";

// Import appointment type
import { Appointment } from "@/types/appointment";

// Import status badge component
import { AppointmentStatusBadge } from "./appointment-status-badge";

// Import action buttons component
import { AppointmentActions } from "./appointment-actions";

// Define table columns
export function getAppointmentColumns(
  patients: Patient[],
  doctors: Doctor[],
  onViewAppointment: (appointment: Appointment) => void
): ColumnDef<Appointment>[] {
  return [
    {
      // Column data key
      accessorKey: "patient",

      // Column heading
      header: "Patient",

      // Custom cell renderer
      cell: ({ row }) => {
        // Get patient data

        const patient = row.original.patient;

        // Render patient info
        return (
          <div>
            {/* Patient full name */}

            <p className="font-medium text-gray-900">
              {patient.firstName} {patient.lastName}
            </p>

            {/* Patient phone */}

            <p className="text-xs text-gray-500">{patient.phone}</p>
          </div>
        );
      },

      // Patient search filter

      filterFn: (row, _, value) => {
        // Get patient data

        const patient = row.original.patient;

        // Build full name

        const fullName = `${patient.firstName} ${patient.lastName}`;

        // Case-insensitive match

        return fullName.toLowerCase().includes(String(value).toLowerCase());
      },
    },

    {
      // Column data key
      accessorKey: "doctor",

      // Column heading
      header: "Doctor",

      // Custom cell renderer
      cell: ({ row }) => {
        // Get doctor data
        const doctor = row.original.doctor;

        // Render doctor info
        return (
          <div>
            {/* Doctor name */}

            <p className="font-medium text-gray-900">
              Dr. {doctor.firstName} {doctor.lastName}
            </p>

            {/* Doctor specialization */}

            <p className="text-xs text-gray-500">{doctor.specialization}</p>
          </div>
        );
      },

      // Doctor search filter
      filterFn: (row, _, value) => {
        // Get doctor data
        const doctor = row.original.doctor;

        // Build full name
        const fullName = `${doctor.firstName} ${doctor.lastName}`;

        // Case-insensitive match
        return fullName.toLowerCase().includes(String(value).toLowerCase());
      },
    },

    {
      // Column data key
      accessorKey: "appointmentDate",

      // Column heading
      header: "Date",

      // Date filter
      filterFn: (row, _, value) => {
        // Exact date match
        return row.original.appointmentDate === value;
      },
    },

    {
      // Column data key
      accessorKey: "startTime",

      // Column heading
      header: "Time",

      // Custom cell renderer
      cell: ({ row }) => (
        // Show appointment time

        <span className="font-medium">{row.original.startTime}</span>
      ),
    },

    {
      // Column data key
      accessorKey: "status",

      // Column heading
      header: "Status",

      // Render status badge
      cell: ({ row }) => (
        <AppointmentStatusBadge status={row.original.status} />
      ),

      // Status filter
      filterFn: (row, _, value) => {
        // Exact status match

        return row.original.status === value;
      },
    },

    {
      // Custom column ID
      id: "actions",

      // Empty header
      header: "",

      // Disable sorting
      enableSorting: false,

      // Disable filtering
      enableColumnFilter: false,

      // Render action buttons
      cell: ({ row }) => (
        <AppointmentActions
          appointment={row.original}
          patients={patients}
          doctors={doctors}
          onView={() => onViewAppointment(row.original)}
        />
      ),
    },
  ];
}
