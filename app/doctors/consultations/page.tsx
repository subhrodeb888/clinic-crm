import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";

export default function ConsultationsPage() {
  return (
    <DashboardShell>
      <PageContainer>
        <PageHeader
          title="Consultations"
          description="Consultation list coming soon"
        />
      </PageContainer>
    </DashboardShell>
  );
}