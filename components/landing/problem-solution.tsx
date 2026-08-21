import { X, CheckCircle2 } from "lucide-react";

import { Section, SectionHeading } from "./section";

const FRAGMENTED = [
  "Appointments scattered across spreadsheets and paper diaries",
  "Patient files living in separate folders, cabinets or systems",
  "Queue status tracked by word of mouth at the front desk",
  "Billing, reminders and reports handled in disconnected tools",
];

const CENTRALIZED = [
  "One shared record for every patient, visit and treatment",
  "A live queue that updates the moment someone checks in",
  "Consultations, prescriptions and invoices on the same screen",
  "Roles that show each team member exactly what they need",
];

export function ProblemSolution() {
  return (
    <Section id="problem" className="bg-white">
      <SectionHeading
        eyebrow="The problem"
        title="Clinic operations shouldn’t feel fragmented"
        description="Most small clinics juggle the same daily loop across several disconnected tools and stacks of paper. That is where information gets lost and time gets spent on chasing instead of caring."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        {/* Fragmented */}
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-700">
            Disconnected today
          </span>

          <ul className="mt-6 space-y-4">
            {FRAGMENTED.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <X className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                <p className="text-gray-700">{item}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Centralized */}
        <div className="relative rounded-2xl border border-blue-200 bg-blue-50/40 p-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 shadow-sm">
            Centralized with Clinic CRM
          </span>

          <ul className="mt-6 space-y-4">
            {CENTRALIZED.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <p className="text-gray-800">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}