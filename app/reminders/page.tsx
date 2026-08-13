import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";

import { Card } from "@/components/ui/card";

import { ReminderKPIs } from "@/features/reminders/analytics/reminder-kpis";

import { RemindersTable } from "@/features/reminders/table/reminders-table";

import { getReminders } from "@/actions/reminders/get-reminders";
import { getReminderMetrics } from "@/actions/reminders/get-reminder-metrics";

export default async function RemindersPage() {
  const reminders = await getReminders();
  const metrics = await getReminderMetrics();
  return (
    <DashboardShell>
      <PageContainer>
        <PageHeader
          title="Reminder Center"
          description="Patient communication and reminder tracking."
        />

        <div className="space-y-6">
          {/* KPI STRIP */}

          <ReminderKPIs metrics={metrics} />

          {/* TABLE */}

          <Card className="p-0">
            <RemindersTable reminders={reminders} />
          </Card>
        </div>
      </PageContainer>
    </DashboardShell>
  );
}
