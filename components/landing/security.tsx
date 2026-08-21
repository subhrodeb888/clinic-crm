import { ShieldCheck, KeyRound, Database, Lock, Cloud, ServerCog } from "lucide-react";

import { Section, SectionHeading } from "./section";

const ITEMS = [
  {
    icon: KeyRound,
    title: "Auth.js authentication",
    text: "Google OAuth with JWT sessions keeps access flowing through a single, proven sign-in flow.",
  },
  {
    icon: ShieldCheck,
    title: "Role-based authorization",
    text: "Receptionist, doctor and admin roles are enforced by a permission map on every action.",
  },
  {
    icon: Database,
    title: "PostgreSQL · Drizzle ORM",
    text: "A relational schema with typed, tested repositories keeps clinical data consistent.",
  },
  {
    icon: Lock,
    title: "Patient-scoped document access",
    text: "Uploaded documents are authorized per patient — retrieval never crosses into another patient’s records.",
  },
  {
    icon: Cloud,
    title: "R2 object storage",
    text: "Original medical documents are stored durably and retrieved with short-lived, signed URLs.",
  },
  {
    icon: ServerCog,
    title: "Server-side AI processing",
    text: "PDF parsing, embeddings and answer generation run on the server, never in the browser.",
  },
];

export function Security() {
  return (
    <Section className="bg-white">
      <SectionHeading
        eyebrow="Trusted foundations"
        title="A serious stack behind the interface"
        description="Clinic CRM is built on production infrastructure — authentication, authorization, a real database, vector search and object storage."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((item) => (
          <div key={item.title} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
              <item.icon className="h-5 w-5 text-blue-600" />
            </span>
            <h3 className="mt-4 text-base font-semibold text-gray-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">{item.text}</p>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-gray-400">
        AI document chat is a staff assistance tool that grounds answers in the documents you upload. It does not
        provide medical diagnosis, replace clinical judgement, or substitute for a treating doctor.
      </p>
    </Section>
  );
}