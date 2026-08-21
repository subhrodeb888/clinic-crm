import {
  CalendarDays,
  FileText,
  HeartPulse,
  Layers,
  ListChecks,
  Receipt,
} from "lucide-react";

const VALUES = [
  { icon: CalendarDays, label: "Appointments", tone: "text-blue-600 bg-blue-50" },
  { icon: HeartPulse, label: "Patients", tone: "text-rose-600 bg-rose-50" },
  { icon: ListChecks, label: "Live Queue", tone: "text-cyan-600 bg-cyan-50" },
  { icon: Layers, label: "Consultations", tone: "text-purple-600 bg-purple-50" },
  { icon: Receipt, label: "Billing", tone: "text-amber-600 bg-amber-50" },
  { icon: FileText, label: "AI Answers", tone: "text-green-600 bg-green-50" },
];

/** Value strip — the core capabilities at a glance. */
export function ValueStrip() {
  return (
    <section className="border-t border-gray-200 bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {VALUES.map((value) => (
          <div key={value.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${value.tone}`}>
              <value.icon className="h-5 w-5" />
            </span>
            <p className="mt-2 text-sm font-medium text-gray-800">{value.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}