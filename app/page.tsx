import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { ValueStrip } from "@/components/landing/value-strip";
import { ProblemSolution } from "@/components/landing/problem-solution";
import { Features } from "@/components/landing/features";
import { Workflow } from "@/components/landing/workflow";
import { AiShowcase } from "@/components/landing/ai-showcase";
import { ProductShowcase } from "@/components/landing/product-showcase";
import { Roles } from "@/components/landing/roles";
import { Security } from "@/components/landing/security";
import { Cta, Footer } from "@/components/landing/cta-footer";

export const metadata = {
  title: "Clinic CRM — Run your clinic from one intelligent workspace",
  description:
    "Clinic CRM is an intelligent workspace for running your clinic: appointments, patient records, a live queue, doctor consultations, prescriptions, billing, reports, reminders, role-based access, and AI document chat.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-gray-900">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <ValueStrip />
        <ProblemSolution />
        <Features />
        <Workflow />
        <AiShowcase />
        <ProductShowcase />
        <Roles />
        <Security />
        <Cta />
      </main>

      <Footer />
    </div>
  );
}
