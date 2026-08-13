"use client";

import type { Patient } from "@/types/patient";
import type { PatientDocument } from "@/types/document";

import { DocumentTable } from "../documents/document-table";
import { EmptyDocuments } from "../documents/empty-documents";
import { UploadDocumentButton } from "../documents/document-upload-button";

type DocumentsTabProps = {
  patient: Patient;
  documents: PatientDocument[];
};

export function DocumentsTab({
  patient,
  documents,
}: DocumentsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Documents
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Store and manage medical documents for this patient.
          </p>
        </div>

        <UploadDocumentButton patient={patient} />
      </div>

      {documents.length === 0 ? (
        <EmptyDocuments patient={patient} />
      ) : (
        <DocumentTable
          patient={patient}
          documents={documents}
        />
      )}
    </div>
  );
}