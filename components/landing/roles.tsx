import { Headset, Stethoscope, ShieldCheck } from "lucide-react";

import { Section, SectionHeading } from "./section";

const ROLES = [
  {
    icon: Headset,
    title: "Receptionist",
    tone: "text-blue-600 bg-blue-50",
    points: [
      "Book and manage appointments",
      "Check patients in and move the live queue",
      "Capture billing and raise invoices",
      "Keep patient records and reminders current",
    ],
  },
  {
    icon: Stethoscope,
    title: "Doctor",
    tone: "text-purple-600 bg-purple-50",
    points: [
      "See today’s consultations and queue at a glance",
      "Run the consultation and build prescriptions",
      "Review the patient timeline and history",
      "Ask grounded questions against the patient’s documents",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Admin",
    tone: "text-teal-600 bg-teal-50",
    points: [
      "Oversee KPIs, reports and clinic performance",
      "Manage staff and fine-tune role permissions",
      "Configure clinic details, notifications, and access",
      "Keep the whole operation aligned",
    ],
  },
];

export function Roles() {
  return (
    <Section id="roles" className="bg-white">
      <SectionHeading
        eyebrow="Built for every role"
        title="The right workspace for every member of the team"
        description="Each role sees the tools it needs — protected by role-based authorization, so permissions stay clear and consistent."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {ROLES.map((role) => (
          <div key={role.title} className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
            <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${role.tone}`}>
              <role.icon className="h-6 w-6" />
            </span>

            <h3 className="mt-4 text-xl font-semibold text-gray-900">{role.title}</h3>

            <ul className="mt-5 space-y-2.5">
              {role.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}