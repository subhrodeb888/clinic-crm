import { BarChart3, CalendarDays, HeartPulse, Sparkles } from "lucide-react";

import { Section, SectionHeading } from "./section";

const APPOINTMENTS = [
  { time: "09:00", patient: "Ananya Sharma", type: "Follow-up", status: "Completed", statusClass: "bg-green-100 text-green-700" },
  { time: "10:30", patient: "Ravi Patel", type: "Consultation", status: "In queue", statusClass: "bg-blue-100 text-blue-700" },
  { time: "11:15", patient: "Meera Nair", type: "New patient", status: "Checked in", statusClass: "bg-cyan-100 text-cyan-700" },
  { time: "12:00", patient: "Karan Joshi", type: "Consultation", status: "Waiting", statusClass: "bg-gray-100 text-gray-600" },
];

const PROFILE_TABS = ["Overview", "Documents", "Billing", "Notes"];

export function ProductShowcase() {
  return (
    <Section id="product" className="bg-gray-50">
      <SectionHeading
        eyebrow="Product tour"
        title="A closer look at the interface"
        description="The same surfaces you’ll work in every day — designed to be dense where it matters and quiet where it can be."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {/* Dashboard */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <PanelHeader icon={BarChart3} title="Dashboard" subtitle="KPI cards and trend charts" />
          <div className="grid grid-cols-4 gap-3 p-4">
            {[
              { label: "Today", value: "38" },
              { label: "Checked in", value: "12" },
              { label: "Revenue", value: "₹34k" },
              { label: "Outstanding", value: "₹9.2k" },
            ].map((kpi) => (
              <div key={kpi.label} className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                <p className="text-[11px] text-gray-500">{kpi.label}</p>
                <p className="mt-1 text-lg font-bold text-gray-900">{kpi.value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs font-medium text-gray-500">Appointments this week</p>
            <div className="mt-3 flex h-16 items-end gap-2">
              {[40, 65, 50, 80, 60, 90, 72].map((h, i) => (
                <div key={i} className="w-full rounded-t-md" style={{ height: `${h}%`, backgroundColor: `rgba(37, 99, 235, ${(h / 100) * 0.6 + 0.3})` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Patient profile */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <PanelHeader icon={HeartPulse} title="Patient profile" subtitle="Summary, timeline and quick actions" />
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-semibold text-gray-900">Ananya Sharma</p>
                <p className="text-xs text-gray-500">Female · 34 · A+ · +91 98•••• ••21</p>
              </div>
              <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">Active</span>
</div>

            <div className="mt-4 flex gap-1.5 overflow-x-auto border-b border-gray-100 pb-2">
              {PROFILE_TABS.map((tab, i) => (
                <span key={tab} className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium ${i === 0 ? "bg-blue-600 text-white" : "text-gray-600"}`}>
                  {tab}
                </span>
              ))}
            </div>

            <div className="mt-3 space-y-2.5">
              {[
                ["Last visit", "12 Feb 2026 · Dr. Sen"],
                ["Prescriptions", "3 active medications"],
                ["Outstanding", "₹1,250 due"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2">
                  <span className="text-sm text-gray-600">{label}</span>
                  <span className="text-xs font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Appointments / queue */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <PanelHeader icon={CalendarDays} title="Queue & appointments" subtitle="Today’s schedule with statuses" />
          <div className="space-y-2.5 p-5">
            {APPOINTMENTS.map((row) => (
              <div key={row.patient} className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5">
                <div>
                  <p className="text-sm font-medium text-gray-900">{row.patient}</p>
                  <p className="text-xs text-gray-500">{row.time} · {row.type}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${row.statusClass}`}>{row.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI chat */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <PanelHeader icon={Sparkles} title="AI document chat" subtitle="Grounded patient-record answers" />
          <div className="space-y-3 p-5">
            <div className="ml-auto max-w-[85%] rounded-xl bg-blue-600 px-3 py-2.5 text-xs text-white">
              Any allergy noted in Anita’s records?
            </div>
            <div className="mr-auto max-w-[85%] rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs text-gray-900">
              <p>Yes — pollen allergy with seasonal rhinitis recorded on 5 Jan 2026 ([1]).</p>
              <p className="mt-2 border-t border-gray-200 pt-2 text-[11px] font-semibold uppercase text-gray-500">Sources</p>
              <p className="mt-1 text-xs">
                <span className="rounded bg-red-50 px-1.5 text-red-700">[1]</span> intake_records.pdf · Chunk #2 · 90% match
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function PanelHeader({ icon: Icon, title, subtitle }: { icon: typeof BarChart3; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50">
        <Icon className="h-4 w-4 text-blue-600" />
      </span>
      <div>
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}
