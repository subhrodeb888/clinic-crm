import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Logo } from "./logo";

export function Cta() {
  return (
    <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-b from-blue-600 to-blue-700 px-6 py-16 text-center shadow-lg sm:px-12">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to bring your clinic into one workspace?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-base text-blue-100">
          Sign in to start managing appointments, patients, consultations,
          billing and reports — with grounded AI document chat for your staff.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/login"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-7 text-base font-medium text-blue-700 shadow-sm transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="#workflow"
            className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-blue-300/60 px-7 text-base font-medium text-white transition-colors hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
          >
            See the workflow
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const columns = [
    {
      heading: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "AI document chat", href: "#ai" },
        { label: "Workflow", href: "#workflow" },
        { label: "Product tour", href: "#product" },
      ],
    },
    {
      heading: "Roles",
      links: [
        { label: "Receptionist", href: "#roles" },
        { label: "Doctor", href: "#roles" },
        { label: "Admin", href: "#roles" },
      ],
    },
    {
      heading: "Account",
      links: [
        { label: "Sign In", href: "/login" },
        { label: "Get Started", href: "/login" },
      ],
    },
  ];

  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-500">
              An intelligent workspace for running your clinic — appointments,
              patient records, queue, consultations, billing, reports,
              reminders and grounded AI document chat.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.heading}>
              <h3 className="text-sm font-semibold text-gray-900">{column.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 sm:flex-row">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Clinic CRM. A demo product visualization.
          </p>
          <p className="text-xs text-gray-400">
            Access is restricted to authorized clinic staff.
          </p>
        </div>
      </div>
    </footer>
  );
}