import { FileUp, ScanSearch, Database, Filter, Sparkles, FileText } from "lucide-react";

import { Section, SectionHeading } from "./section";

const PIPELINE = [
  { label: "1. Upload PDF", icon: FileUp, text: "A patient’s medical document is attached to their record." },
  { label: "2. Process", icon: ScanSearch, text: "Text is extracted, cleaned and split into chunks." },
  { label: "3. Embed", icon: Database, text: "Each chunk becomes a vector stored with pgvector." },
  { label: "4. Patient-scoped retrieval", icon: Filter, text: "Only that patient’s ready documents are searched." },
  { label: "5. Grounded answer", icon: Sparkles, text: "The model answers using only the retrieved context with citations." },
];

const CITATIONS = [
  { ref: "[1]", file: "labs_feb_2026.pdf", type: "Lab Report", chunk: "Chunk #3", match: "92%" },
  { ref: "[2]", file: "medication_history.pdf", type: "Prescription", chunk: "Chunk #5", match: "87%" },
];

export function AiShowcase() {
  return (
    <Section id="ai" className="bg-gray-50">
      <SectionHeading
        eyebrow="AI document chat"
        title="Answers grounded in your patient’s own records"
        description="Upload a patient’s medical PDFs and ask questions about that patient. Every response is built only from their documents, retrieved by relevance and backed with source citations you can open."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-2 items-start">
        {/* Pipeline */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            How it works
          </p>

          <ol className="mt-6 space-y-4">
            {PIPELINE.map((step) => (
              <li key={step.label} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-blue-50">
                  <step.icon className="h-5 w-5 text-blue-600" />
                </span>
                <div>
                  <p className="font-semibold text-gray-900">{step.label}</p>
                  <p className="mt-0.5 text-sm text-gray-500">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-sm leading-relaxed text-blue-700">
              Retrieval is isolated to the patient and limited to processed,
              ready documents — so the answer always stays grounded in what is on
              file, with inline <span className="font-semibold">[N]</span> citations to the source and chunk.
            </p>
          </div>
        </div>

        {/* Mock chat */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <Sparkles className="h-4 w-4 text-white" />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">Medical records chat</p>
                <p className="text-xs text-gray-500">Patient · Anita Deshmukh</p>
              </div>
            </div>
            <span className="rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-medium text-green-700">Ready</span>
          </div>

          <div className="space-y-4 p-5">
            <div className="ml-auto max-w-[80%] rounded-2xl bg-blue-600 px-4 py-3 text-sm text-white">
              What was Anita prescribed for her blood pressure in February?
            </div>

            <div className="mr-auto max-w-[80%] rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900">
              <p>
                On 18 Feb 2026 the patient was prescribed <span className="font-medium">Metoprolol 25 mg</span>, once daily,
                to manage her blood pressure, with a follow-up after six weeks ([1][2]).
              </p>

              <div className="mt-4 space-y-2 border-t border-gray-200 pt-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Sources</p>

                {CITATIONS.map((citation) => (
                  <div key={citation.ref} className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-3">
                    <span className="rounded-lg bg-red-50 p-2">
                      <FileText className="h-4 w-4 text-red-600" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {citation.ref} {citation.file}
                      </p>
                      <p className="text-xs text-gray-500">
                        {citation.type} · {citation.chunk} · {citation.match} match
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-end gap-3 border-t border-gray-200 bg-white p-4">
            <input
              disabled
              type="text"
              placeholder="Ask about lab results, diagnoses, medications…"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-400"
            />
            <span className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white opacity-50">
              Send
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}