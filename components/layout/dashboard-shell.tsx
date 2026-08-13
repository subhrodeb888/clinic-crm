import { auth } from "@/auth";

import { AppSidebar } from "./app-sidebar";
import { MobileSidebar } from "./mobile-sidebar";
import { TopNavbar } from "./top-navbar";

type DashboardShellProps = {
  children: React.ReactNode;
};

export async function DashboardShell({
  children,
}: DashboardShellProps) {
  const session = await auth();
  const role = session?.user?.role ?? null;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Desktop sidebar */}
      <AppSidebar role={role} />

      {/* Mobile sidebar */}
      <MobileSidebar />

      {/* Right section */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top navigation */}
        <TopNavbar />

        {/* Main page */}
        <main className="min-h-0 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}