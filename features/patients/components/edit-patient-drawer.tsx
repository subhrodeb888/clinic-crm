"use client";

import { useState } from "react";

import { Pencil } from "lucide-react";

import { Drawer } from "@/components/ui/drawer";

import { Patient } from "@/types/patient";

import { PatientForm } from "./patient-form";

type Props = {
  patient: Patient;
};

export function EditPatientDrawer({
  patient,
}: Props) {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <button
        onClick={() =>
          setOpen(true)
        }
        className="
          rounded-lg p-2
          text-gray-400
          transition-colors
          hover:bg-gray-100
          hover:text-gray-700
        "
      >
        <Pencil size={16} />
      </button>

      <Drawer
        open={open}
        onClose={() =>
          setOpen(false)
        }
        title="Edit Patient"
      >
        <PatientForm
          mode="edit"
          patient={patient}
          onSuccess={() =>
            setOpen(false)
          }
        />
      </Drawer>
    </>
  );
}