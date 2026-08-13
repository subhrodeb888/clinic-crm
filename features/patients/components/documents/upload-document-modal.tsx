"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { uploadDocument } from "@/actions/documents/upload-document";

import type { Patient } from "@/types/patient";
import type { DocumentType } from "@/repositories/document.repository";

type UploadDocumentModalProps = {
  patient: Patient;
  open: boolean;
  onClose: () => void;
};

const documentTypes: {
  value: DocumentType;
  label: string;
}[] = [
  { value: "LAB_REPORT", label: "Lab Report" },
  { value: "PRESCRIPTION", label: "Prescription" },
  { value: "DISCHARGE_SUMMARY", label: "Discharge Summary" },
  { value: "MRI", label: "MRI" },
  { value: "CT_SCAN", label: "CT Scan" },
  { value: "X_RAY", label: "X-Ray" },
  { value: "REFERRAL", label: "Referral" },
  { value: "CONSULTATION_NOTE", label: "Consultation Note" },
  { value: "OTHER", label: "Other" },
];

export function UploadDocumentModal({
  patient,
  open,
  onClose,
}: UploadDocumentModalProps) {
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);

  const [isPending, startTransition] = useTransition();

  const [documentType, setDocumentType] =
    useState<DocumentType>("OTHER");

  const [file, setFile] = useState<File | null>(null);

  const [error, setError] = useState("");

  if (!open) {
    return null;
  }

  function reset() {
    formRef.current?.reset();

    setDocumentType("OTHER");

    setFile(null);

    setError("");
  }

  function handleClose() {
    reset();

    onClose();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file) {
      setError("Please choose a PDF document.");

      return;
    }

    const formData = new FormData();

    formData.append("patientId", patient.id);

    formData.append("documentType", documentType);

    formData.append("file", file);

    startTransition(async () => {
      setError("");

      const result = await uploadDocument(formData);

      if (!result.success) {
        setError(result.error);

        return;
      }

      handleClose();

      router.refresh();
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-xl font-semibold">
            Upload Document
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Upload a medical document for this patient.
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Document Type
            </label>

            <select
              value={documentType}
              onChange={(e) =>
                setDocumentType(e.target.value as DocumentType)
              }
              disabled={isPending}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            >
              {documentTypes.map((type) => (
                <option
                  key={type.value}
                  value={type.value}
                >
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              PDF Document
            </label>

            <input
              type="file"
              accept="application/pdf"
              disabled={isPending}
              onChange={(e) => {
                const selected = e.target.files?.[0] ?? null;

                setFile(selected);
              }}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2"
            />

            <p className="mt-2 text-xs text-gray-500">
              Maximum file size: 20 MB
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isPending ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}