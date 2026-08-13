type CalendarToolbarProps = {
  label: string;

  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;

  onView: (view: "month" | "week" | "day") => void;

  view: string;
};

export function CalendarToolbar({
  label,
  onNavigate,
  onView,
  view,
}: CalendarToolbarProps) {
  return (
    <div
      className="
        mb-6 flex flex-col gap-4
        lg:flex-row lg:items-center
        lg:justify-between
      "
    >
      {/* NAVIGATION */}

      <div className="flex items-center gap-2">
        <button
          onClick={() => onNavigate("PREV")}
          className="
            rounded-lg border border-gray-300
            px-4 py-2 text-sm
            hover:bg-gray-50
          "
        >
          Previous
        </button>

        <button
          onClick={() => onNavigate("TODAY")}
          className="
            rounded-lg border border-gray-300
            px-4 py-2 text-sm
            hover:bg-gray-50
          "
        >
          Today
        </button>

        <button
          onClick={() => onNavigate("NEXT")}
          className="
            rounded-lg border border-gray-300
            px-4 py-2 text-sm
            hover:bg-gray-50
          "
        >
          Next
        </button>
      </div>

      {/* LABEL */}

      <h2 className="text-lg font-semibold">{label}</h2>

      {/* VIEW SWITCHER */}

      <div className="flex items-center gap-2">
        {["day", "week", "month"].map((calendarView) => (
          <button
            key={calendarView}
            onClick={() => onView(calendarView as "day" | "week" | "month")}
            className={`
                rounded-lg border px-4 py-2 text-sm capitalize

                ${
                  view === calendarView
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 bg-white hover:bg-gray-50"
                }
              `}
          >
            {calendarView}
          </button>
        ))}
      </div>
    </div>
  );
}
