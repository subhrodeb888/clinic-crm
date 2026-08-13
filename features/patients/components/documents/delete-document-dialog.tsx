"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { deleteDocument } from "@/actions/documents/delete-document";

type DeleteDocumentDialogProps = {
  open: boolean;
  documentId: string;
  documentName: string;
  patientId: string;
  onClose: () => void;
};

export function DeleteDocumentDialog({
  open,
  documentId,
  documentName,
  patientId,
  onClose,
}: DeleteDocumentDialogProps) {
  const router = useRouter();

  const [error, setError] = useState("");

  const [isPending, startTransition] = useTransition();

  if (!open) {
    return null;
  }

  function handleDelete() {
    startTransition(async () => {
      setError("");

      const result = await deleteDocument(
        documentId,
        patientId,
      );

      if (!result.success) {
        setError(result.error);

        return;
      }

      onClose();

      router.refresh();
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Delete Document
          </h2>
        </div>

        <div className="space-y-4 p-6">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete
            <span className="font-medium text-gray-900">
              {" "}
              {documentName}
            </span>
            ?
          </p>

          <p className="text-sm text-red-600">
            This action cannot be undone.
          </p>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              disabled={isPending}
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={isPending}
              onClick={handleDelete}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
            >
              {isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}