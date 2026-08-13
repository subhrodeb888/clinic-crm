type PatientProfileLayoutProps = {
  header: React.ReactNode;

  summary: React.ReactNode;

  actions: React.ReactNode;

  tabs: React.ReactNode;

  children: React.ReactNode;
};

export function PatientProfileLayout({
  header,
  summary,
  actions,
  tabs,
  children,
}: PatientProfileLayoutProps) {
  return (
    <div className="space-y-6">
      {/* HEADER */}

      {header}

      {/* SUMMARY */}

      {summary}

      {/* STICKY ACTIONS */}

      <div
        className="
          sticky top-0 z-20
          rounded-2xl border
          border-gray-200 bg-white
          p-4 shadow-sm
        "
      >
        {actions}
      </div>

      {/* TABS */}

      {tabs}

      {/* CONTENT */}

      <div>{children}</div>
    </div>
  );
}
