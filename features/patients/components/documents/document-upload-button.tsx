"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { UploadDocumentModal } from "./upload-document-modal";

import type { Patient } from "@/types/patient";

type UploadDocumentButtonProps = {
  patient: Patient;
};

export function UploadDocumentButton({ patient }: UploadDocumentButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
          inline-flex
          items-center
          gap-2
          rounded-lg
          bg-blue-600
          px-4
          py-2.5
          text-sm
          font-medium
          text-white
          transition-colors
          hover:bg-blue-700
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:ring-offset-2
        "
      >
        <Plus className="h-4 w-4" />
        Upload Document
      </button>

      <UploadDocumentModal
        patient={patient}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
