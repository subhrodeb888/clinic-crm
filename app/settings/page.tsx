import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";

import { Card } from "@/components/ui/card";

import { StaffTable } from "@/features/settings/staff/staff-table";

import { ClinicInformationCard } from "@/features/settings/clinic/clinic-information-card";
import { ClinicSettingsForm } from "@/features/settings/clinic/clinic-settings-form";

import { ProfileSettingsForm } from "@/features/settings/profile/profile-settings-form";
import { PasswordSettings } from "@/features/settings/profile/password-settings";
import { NotificationSettings } from "@/features/settings/profile/notification-settings";

import { getSettingsMetrics } from "@/features/settings/utils/settings-metrics";

import { Shield, Stethoscope, Users, UserCog } from "lucide-react";

import { StatsCard } from "@/features/dashboard/components/stats-card";

export default function SettingsPage() {
  const metrics = getSettingsMetrics();

  return (
    <DashboardShell>
      <PageContainer>
        <PageHeader
          title="Settings & Staff Management"
          description="Manage clinic information, staff access, and personal preferences."
        />

        <div className="space-y-6">
          {/* KPI STRIP */}

          <div
            className="
              grid gap-6
              sm:grid-cols-2
              xl:grid-cols-4
            "
          >
            <StatsCard
              title="Total Staff"
              value={metrics.totalStaff}
              icon={Users}
            />

            <StatsCard
              title="Doctors"
              value={metrics.activeDoctors}
              icon={Stethoscope}
              iconColor="text-blue-600"
            />

            <StatsCard
              title="Receptionists"
              value={metrics.receptionists}
              icon={UserCog}
              iconColor="text-green-600"
            />

            <StatsCard
              title="Administrators"
              value={metrics.admins}
              icon={Shield}
              iconColor="text-red-600"
            />
          </div>

          {/* CLINIC INFO */}

          <ClinicInformationCard />

          {/* CLINIC SETTINGS */}

          <ClinicSettingsForm />

          {/* STAFF DIRECTORY */}

          <Card>
            <div className="mb-6">
              <h2
                className="
                  text-lg font-semibold
                  text-gray-900
                "
              >
                Staff Directory
              </h2>

              <p
                className="
                  mt-1 text-sm
                  text-gray-500
                "
              >
                Manage clinic staff, roles, and access permissions.
              </p>
            </div>

            <StaffTable />
          </Card>

          {/* PROFILE SETTINGS */}

          <div
            className="
              grid gap-6
              xl:grid-cols-2
            "
          >
            <ProfileSettingsForm />

            <PasswordSettings />
          </div>

          {/* NOTIFICATIONS */}

          <NotificationSettings />
        </div>
      </PageContainer>
    </DashboardShell>
  );
}
