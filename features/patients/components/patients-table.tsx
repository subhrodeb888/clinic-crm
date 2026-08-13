"use client"; // Enable React client-side rendering

import { Patient } from "@/types/patient"; // Import Patient type definition

import { DataTable } from "@/components/tables/data-table"; // Import generic table component

import { patientColumns } from "./patient-columns"; // Import column definitions for patients

import { PatientsTableToolbar } from "./patients-table-toolbar"; // Import toolbar component for table actions

type PatientsTableProps = {
  // Define props type
  patients: Patient[]; // Accept array of patient objects
};

export function PatientsTable({ patients }: PatientsTableProps) {
  // Component receives patients
  return (
    // Render
    <DataTable // Use generic table
      columns={patientColumns} // Pass column config
      data={patients} // Pass patient data
      toolbar={(table) => <PatientsTableToolbar table={table} />} // Render toolbar with table instance
    />
  );
}
