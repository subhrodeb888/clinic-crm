"use client";

import { Eye } from "lucide-react";

import { Patient } from "@/types/patient";

import { EditPatientDrawer } from "./edit-patient-drawer";

import { DeletePatientButton } from "./delete-patient-button";

import Link from "next/link";
type PatientActionsProps = {
  patient: Patient;
};

export function PatientActions({ patient }: PatientActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/patients/${patient.id}`}
        className="
    rounded-lg p-2
    text-gray-400
    transition-colors
    hover:bg-gray-100
    hover:text-gray-700
  "
      >
        <Eye size={16} />
      </Link>

      <EditPatientDrawer patient={patient} />

      <DeletePatientButton patientId={patient.id} />
    </div>
  );
}
