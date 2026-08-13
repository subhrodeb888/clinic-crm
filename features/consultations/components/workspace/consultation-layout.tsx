type ConsultationLayoutProps = {
  leftPanel: React.ReactNode;

  rightPanel: React.ReactNode;
};

export function ConsultationLayout({
  leftPanel,
  rightPanel,
}: ConsultationLayoutProps) {
  return (
    <div
      className="
        grid gap-6
        xl:grid-cols-[380px_minmax(0,1fr)]
      "
    >
      {/* LEFT */}

      <aside className="space-y-6">{leftPanel}</aside>

      {/* RIGHT */}

      <main className="min-w-0">{rightPanel}</main>
    </div>
  );
}
