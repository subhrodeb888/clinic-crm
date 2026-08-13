type DashboardWidgetProps = {
  title: string;

  description?: string;

  action?: React.ReactNode;

  children: React.ReactNode;
};

export function DashboardWidget({
  title,
  description,
  action,
  children,
}: DashboardWidgetProps) {
  return (
    <div
      className="
        rounded-2xl border
        border-gray-200 bg-white
        p-5 shadow-sm
      "
    >
      {/* HEADER */}

      <div
        className="
          mb-5 flex items-start
          justify-between gap-4
        "
      >
        <div>
          <h2
            className="
              text-base font-semibold
              text-gray-900
            "
          >
            {title}
          </h2>

          {description && <p className="helper-text mt-1">{description}</p>}
        </div>

        {action}
      </div>

      {/* CONTENT */}

      {children}
    </div>
  );
}
