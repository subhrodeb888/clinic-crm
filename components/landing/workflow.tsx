import {
  CalendarDays,
  FileCheck2,
  ListChecks,
  Stethoscope,
  Pill,
  Receipt,
  BellRing,
} from "lucide-react";

import { Section, SectionHeading } from "./section";

const STEPS = [
  { label: "Appointment", icon: CalendarDays, tone: "text-blue-600 bg-blue-50" },
  { label: "Check In", icon: FileCheck2, tone: "text-cyan-600 bg-cyan-50" },
  { label: "Queue", icon: ListChecks, tone: "text-teal-600 bg-teal-50" },
  { label: "Consultation", icon: Stethoscope, tone: "text-purple-600 bg-purple-50" },
  { label: "Prescription", icon: Pill, tone: "text-rose-600 bg-rose-50" },
  { label: "Billing", icon: Receipt, tone: "text-amber-600 bg-amber-50" },
  { label: "Follow-up", icon: BellRing, tone: "text-indigo-600 bg-indigo-50" },
];

/** Clinic workflow — the full patient journey through the product. */
export function Workflow() {
  return (
    <Section id="workflow" className="bg-white">
      <SectionHeading
        eyebrow="The patient journey"
        title="One clear flow, from booking to follow-up"
        description="Clinic CRM mirrors exactly how a clinic runs, so every step of the patient visit moves through the same connected workflow."
      />

      <div className="mt-14">
        {/* Desktop: horizontal stepper */}
        <ol className="hidden grid-cols-7 gap-2 lg:grid">
          {STEPS.map((step, index) => (
            <li key={step.label} className="flex flex-col items-center gap-3 text-center">
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 ${step.tone} shadow-sm`}>
                <step.icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium text-gray-800">{step.label}</span>
              {index < STEPS.length - 1 && (
                <span className="mt-1 h-px w-full bg-gray-200" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>

        {/* Mobile / tablet: vertical stepper */}
        <ol className="space-y-4 lg:hidden">
          {STEPS.map((step, index) => (
            <li key={step.label} className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm">
                <step.icon className={`h-5 w-5 ${step.tone.split(" ")[0]}`} />
              </span>
              <div className="flex-1">
                <span className="mr-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-gray-800">{step.label}</span>
              </div>
              {index < STEPS.length - 1 && (
                <span className="w-px h-8 bg-gray-200" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}