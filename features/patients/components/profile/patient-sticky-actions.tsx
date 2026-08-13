"use client";

import { Doctor } from "@/types/doctor";
import { Patient } from "@/types/patient";
import Link from "next/link";

import { BookAppointmentButton } from "./book-appointment-button";

type PatientStickyActionsProps = {
  patient: Patient;

  doctors: Doctor[];
};

export function PatientStickyActions({
  patient,
  doctors,
}: PatientStickyActionsProps) {
  return (
    <div
      className="
        flex flex-wrap
        items-center gap-3
      "
    >
      <BookAppointmentButton
        patientId={patient.id}
        patients={[patient]}
        doctors={doctors}
      />

      <Link
        href={`/billing?patientId=${patient.id}`}
        className="
          inline-flex h-10 items-center justify-center
          rounded-lg border border-gray-300
          bg-white px-4 text-sm font-medium
          transition-colors hover:bg-gray-50
        "
      >
        Create Invoice
      </Link>
    </div>
  );
}
