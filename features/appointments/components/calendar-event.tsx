import type { Appointment } from "@/types/appointment";

type CalendarEventProps = {
  event: {
    title: string;

    resource?: Appointment | null;

    appointment?: Appointment | null;
  };
};

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-slate-100 text-slate-800",
  scheduled: "bg-slate-100 text-slate-800",
  confirmed: "bg-blue-100 text-blue-800",
  checked_in: "bg-cyan-100 text-cyan-800",
  in_consultation: "bg-violet-100 text-violet-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  no_show: "bg-amber-100 text-amber-800",
};

export function CalendarEvent({ event }: CalendarEventProps) {
  const appointment = event.resource ?? event.appointment;

  const status = appointment?.status;

  const isCancelled = status === "cancelled";

  return (
    <div
      className={`h-full w-full truncate rounded border-l-4 border-l-current px-2 py-0.5 ${
        STATUS_STYLES[status ?? "scheduled"] ?? STATUS_STYLES.scheduled
      } ${isCancelled ? "line-through" : ""}`}
    >
      <p className="truncate font-medium">{event.title}</p>
    </div>
  );
}
