"use client";

import { FileText } from "lucide-react";

import type { Patient } from "@/types/patient";

import { UploadDocumentButton } from "./document-upload-button";

type EmptyDocumentsProps = {
  patient: Patient;
};

export function EmptyDocuments({
  patient,
}: EmptyDocumentsProps) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-8 py-16">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <div className="mb-6 rounded-full bg-blue-50 p-5">
          <FileText className="h-10 w-10 text-blue-600" />
        </div>

        <h3 className="text-xl font-semibold text-gray-900">
          No documents uploaded
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Upload laboratory reports, prescriptions, discharge summaries,
          imaging reports, referrals, or any other medical documents for this
          patient.
        </p>

        <div className="mt-8">
          <UploadDocumentButton patient={patient} />
        </div>
      </div>
    </div>
  );
}