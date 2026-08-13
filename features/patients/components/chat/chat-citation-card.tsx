"use client";

import { useState, useTransition } from "react";
import { FileText } from "lucide-react";

import { getDocumentDownloadUrl } from "@/actions/documents/get-document-download-url";
import type { ChatCitation } from "@/db/schema";

type ChatCitationCardProps = {
  citation: ChatCitation;
  patientId: string;
};

function formatDocumentType(type: string) {
  return type
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function ChatCitationCard({
  citation,
  patientId,
}: ChatCitationCardProps) {
  const [error, setError] = useState("");

  const [isPending, startTransition] = useTransition();

  function handleOpen() {
    startTransition(async () => {
      setError("");

      const result = await getDocumentDownloadUrl(
        citation.documentId,
        patientId,
      );

      if (!result.success) {
        setError(result.error);
        return;
      }

      window.open(result.url, "_blank", "noopener,noreferrer");
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleOpen}
        disabled={isPending}
        title="Open source document"
        className="flex w-full items-start gap-3 rounded-xl border border-gray-200 bg-white p-3 text-left transition-colors hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50"
      >
        <div className="rounded-lg bg-red-50 p-2">
          <FileText className="h-4 w-4 text-red-600" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-gray-900">
            [{citation.ref}] {citation.originalFilename}
          </p>

          <p className="mt-0.5 text-xs text-gray-500">
            {formatDocumentType(citation.documentType)} · Chunk #
            {citation.chunkIndex} · {(citation.similarity * 100).toFixed(0)}%
            match
          </p>
        </div>
      </button>

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
