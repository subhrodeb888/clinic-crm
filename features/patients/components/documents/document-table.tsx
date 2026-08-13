"use client";

import type { Patient } from "@/types/patient";
import type { PatientDocument } from "@/types/document";

import { DocumentRow } from "./document-row";

type DocumentTableProps = {
  patient: Patient;
  documents: PatientDocument[];
};

export function DocumentTable({
  patient,
  documents,
}: DocumentTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Document
              </th>

              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Type
              </th>

              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Uploaded By
              </th>

              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Uploaded
              </th>

              <th
                scope="col"
                className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Size
              </th>

              <th
                scope="col"
                className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {documents.map((document) => (
              <DocumentRow
                key={document.id}
                patient={patient}
                document={document}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}