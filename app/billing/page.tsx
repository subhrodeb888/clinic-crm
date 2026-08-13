import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";

import { BillingKPIs } from "@/features/billing/analytics/billing-kpis";

import { BillingTable } from "@/features/billing/table/billing-table";

import { getInvoices } from "@/actions/billing/get-invoices";
import { getPatients } from "@/actions/patients/get-patients";
import { getBillingKPIs } from "@/actions/billing/get-billing-kpis";

type BillingPageProps = {
  searchParams?: Promise<{
    patientId?: string;
  }>;
};

export default async function BillingPage({ searchParams }: BillingPageProps) {
  const resolvedSearchParams = await searchParams;
  const initialPatientId = resolvedSearchParams?.patientId;

  const invoices = await getInvoices();
  const patients = await getPatients();
  const kpis = await getBillingKPIs();

  return (
    <DashboardShell>
      <PageContainer>
        <PageHeader
          title="Billing"
          description="Manage invoices, payments, and clinic revenue."
        />

        <div className="space-y-6">
          {/* KPI STRIP */}

          <BillingKPIs kpis={kpis} />

          {/* BILLING TABLE */}

          <BillingTable
            invoices={invoices}
            patients={patients}
            initialPatientId={initialPatientId}
          />
        </div>
      </PageContainer>
    </DashboardShell>
  );
}
