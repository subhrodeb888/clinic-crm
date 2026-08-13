"use client";

import { useTransition } from "react";

import { Trash2 } from "lucide-react";

import { deletePatient } from "@/actions/patients/delete-patient";

type Props = {
  patientId: string;
};

export function DeletePatientButton({ patientId }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this patient?",
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      await deletePatient(patientId);
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={handleDelete}
      className="
        rounded-lg p-2
        text-gray-400
        transition-colors
        hover:bg-red-50
        hover:text-red-600
      "
    >
      <Trash2 size={16} />
    </button>
  );
}
