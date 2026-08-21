import {
  CalendarDays,
  ListChecks,
  HeartPulse,
  Pill,
  Receipt,
  BarChart3,
  Bell,
  ShieldCheck,
} from "lucide-react";

import { Section, SectionHeading } from "./section";

const FEATURES = [
  {
    icon: CalendarDays,
    title: "Appointments",
    description:
      "Schedule and manage appointments in table and calendar views, with 30-minute slots, status updates and one-click queue transitions.",
    tone: "text-blue-600 bg-blue-50",
  },
  {
    icon: HeartPulse,
    title: "Patient records",
    description:
      "Searchable records with a full profile — summary cards, documents, prescriptions, billing, notes and a dated activity timeline.",
    tone: "text-rose-600 bg-rose-50",
  },
  {
    icon: ListChecks,
    title: "Live queue",
    description:
      "A kanban-style board moving patients from waiting to checked in, in consultation and completed — in real time.",
    tone: "text-cyan-600 bg-cyan-50",
  },
  {
    icon: Pill,
    title: "Doctor workspace",
    description:
      "A consultation workspace with patient context, clinical notes, diagnosis and a prescription builder all in one view.",
    tone: "text-purple-600 bg-purple-50",
  },
  {
    icon: Receipt,
    title: "Billing",
    description:
      "Invoices that reconcile with line items, patient balances and outstanding totals — generated straight from the visit.",
    tone: "text-amber-600 bg-amber-50",
  },
  {
    icon: BarChart3,
    title: "Reports",
    description:
      "Revenue, doctor performance, no-show rate and patient growth analytics that keep you on track week to week.",
    tone: "text-green-600 bg-green-50",
  },
  {
    icon: Bell,
    title: "Reminders",
    description:
      "Track follow-ups and reminders with status and type, so no patient falls between the cracks.",
    tone: "text-indigo-600 bg-indigo-50",
  },
  {
    icon: ShieldCheck,
    title: "Role-based access",
    description:
      "Receptionist, doctor and admin roles backed by a permission map, so teams only see what they need.",
    tone: "text-teal-600 bg-teal-50",
  },
];

export function Features() {
  return (
    <Section id="features" className="bg-gray-50">
      <SectionHeading
        eyebrow="Everything in one place"
        title="Every clinic workflow, covered"
        description="From front desk to follow-up, Clinic CRM brings the full day-to-day of running a clinic into one interface."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${feature.tone}`}>
              <feature.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}