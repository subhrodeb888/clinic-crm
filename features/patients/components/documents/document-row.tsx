"use client";

import { useState, useTransition } from "react";
import { Download, Eye, FileText, Trash2 } from "lucide-react";

import { getDocumentDownloadUrl } from "@/actions/documents/get-document-download-url";

import type { Patient } from "@/types/patient";
import type { PatientDocument } from "@/types/document";

import { DeleteDocumentDialog } from "./delete-document-dialog";

type DocumentRowProps = {
  patient: Patient;
  document: PatientDocument;
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;

  const kb = bytes / 1024;

  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }

  const mb = kb / 1024;

  return `${mb.toFixed(1)} MB`;
}

function formatDocumentType(type: string) {
  return type
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function DocumentRow({ patient, document }: DocumentRowProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  async function openDocument(download = false) {
    startTransition(async () => {
      const result = await getDocumentDownloadUrl(document.id, patient.id);

      if (!result.success) {
        alert(result.error);
        return;
      }

      if (download) {
        const link = window.document.createElement("a");
        link.href = result.url;
        link.download = document.originalFilename;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.click();
        return;
      }

      window.open(result.url, "_blank", "noopener,noreferrer");
    });
  }

  return (
    <>
      <tr className="transition-colors hover:bg-gray-50">
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-red-50 p-2">
              <FileText className="h-5 w-5 text-red-600" />
            </div>

            <div>
              <p className="font-medium text-gray-900">
                {document.originalFilename}
              </p>

              <p className="text-sm text-gray-500">PDF Document</p>
            </div>
          </div>
        </td>

        <td className="px-6 py-4">
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            {formatDocumentType(document.documentType)}
          </span>
        </td>

        <td className="px-6 py-4 text-sm text-gray-700">
          {document.uploadedByName ?? "Unknown"}
        </td>

        <td className="px-6 py-4 text-sm text-gray-500">
          {new Date(document.createdAt).toLocaleDateString()}
        </td>

        <td className="px-6 py-4 text-right text-sm text-gray-500">
          {formatFileSize(document.fileSize)}
        </td>

        <td className="px-6 py-4">
          <div className="flex justify-end gap-2">
            <button
              type="button"
              title="View document"
              disabled={isPending}
              onClick={() => openDocument(false)}
              className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50"
            >
              <Eye className="h-4 w-4" />
            </button>

            <button
              type="button"
              title="Download document"
              disabled={isPending}
              onClick={() => openDocument(true)}
              className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
            </button>

            <button
              type="button"
              title="Delete document"
              onClick={() => setDeleteOpen(true)}
              className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </td>
      </tr>

      <DeleteDocumentDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        patientId={patient.id}
        documentId={document.id}
        documentName={document.originalFilename}
      />
    </>
  );
}
