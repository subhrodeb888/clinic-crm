import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";

import { PatientsTable } from "@/features/patients/components/patients-table";

import { getPatients } from "@/actions/patients/get-patients";
import { AddPatientDrawer } from "@/features/patients/components/add-patient-drawer";

export default async function PatientsPage() {
  const patients = await getPatients();

  return (
    <DashboardShell>
      <PageContainer>
        <PageHeader
          title="Patients"
          description="Manage patient records and relationships"
          actions={<AddPatientDrawer />}
        />

        <PatientsTable patients={patients} />
      </PageContainer>
    </DashboardShell>
  );
}
