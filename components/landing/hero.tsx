import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, Stethoscope, Users } from "lucide-react";

/**
 * Hero — the value proposition plus a faithful mock of the real product
 * dashboard so the actual product UI is the visual centerpiece.
 */
export function Hero() {
  const stats = [
    { label: "Appointments Today", value: "38", icon: CalendarDays, tone: "text-blue-600 bg-blue-50" },
    { label: "Checked In", value: "12", icon: Users, tone: "text-green-600 bg-green-50" },
    { label: "In Consultation", value: "7", icon: Stethoscope, tone: "text-purple-600 bg-purple-50" },
    { label: "Waiting", value: "5", icon: Clock3, tone: "text-amber-600 bg-amber-50" },
  ];

  const queue = [
    { name: "Ananya Sharma", time: "09:30", doctor: "Dr. Roy", status: "Checked In", dot: "bg-cyan-500", statusText: "text-cyan-700" },
    { name: "Ravi Patel", time: "09:45", doctor: "Dr. Sen", status: "Waiting", dot: "bg-gray-400", statusText: "text-gray-600" },
    { name: "Meera Nair", time: "10:00", doctor: "Dr. Verma", status: "In Consultation", dot: "bg-purple-500", statusText: "text-purple-700" },
    { name: "Karan Joshi", time: "10:15", doctor: "Dr. Iyer", status: "Checked In", dot: "bg-cyan-500", statusText: "text-cyan-700" },
    { name: "Likitha Rao", time: "10:30", doctor: "Dr. Roy", status: "Waiting", dot: "bg-gray-400", statusText: "text-gray-600" },
  ];

  return (
    <section className="relative overflow-hidden bg-white px-4 pt-16 sm:px-6 sm:pt-24 lg:px-8">
      {/* Subtle background tint */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-gradient-to-b from-blue-50/70 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Clinic operations, reimagined
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Run your clinic from one{" "}
            <span className="text-blue-600">intelligent workspace</span>.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
            Appointments, patient records, a live queue, consultations, billing,
            reports, reminders and role-based access — with AI document chat to
            ground every answer in your patient&apos;s own records. Everything a
            clinic runs on, in one place.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 text-base font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-auto"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="#features"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-7 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-auto"
            >
              Explore features
            </Link>
          </div>
        </div>
{/* Product mockup */}
        <div className="relative mx-auto mt-16 max-w-4xl">
          {/* Browser frame */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
            <div className="flex items-center gap-1.5 border-b border-gray-100 bg-gray-50 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-3 hidden flex-1 rounded-md bg-white px-3 py-1 text-xs text-gray-400 sm:block">
                app.cliniccrm.com/dashboard
              </span>
            </div>

            <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[1.2fr_1fr]">
              {/* Left: KPI stats */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                      <div className="flex items-start justify-between">
                        <p className="text-xs text-gray-500">{stat.label}</p>
                        <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${stat.tone}`}>
                          <stat.icon className="h-4 w-4" />
                        </span>
                      </div>
                      <p className="mt-2 text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  ))}
</div>

                {/* Mini bar chart */}
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-medium text-gray-500">Revenue this week</p>
                  <div className="mt-3 flex h-24 items-end gap-2">
                    {[45, 70, 50, 85, 65, 95, 78].map((h, i) => (
                      <div key={i} className="w-full rounded-t-md" style={{ height: `${h}%`, backgroundColor: `rgba(37, 99, 235, ${(h / 100) * 0.7 + 0.25})` }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: live queue */}
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900">Live Queue</p>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Live
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {queue.map((row) => (
                    <div key={row.name} className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{row.name}</p>
                        <p className="text-xs text-gray-500">{row.time} · {row.doctor}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${row.statusText}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${row.dot}`} />
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -right-3 -top-5 hidden rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-lg sm:block">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50">
                <Users className="h-4 w-4 text-green-600" />
              </span>
              <div>
                <p className="text-xs text-gray-500">Queued patients</p>
                <p className="text-lg font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
