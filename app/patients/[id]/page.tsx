import { getPatient } from "@/actions/patients/get-patient";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageContainer } from "@/components/layout/page-container";

import { PatientProfileClient } from "@/features/patients/components/profile/patient-profile-client";

import { getPatientTimeline } from "@/actions/patient-timeline/get-patient-timeline";
import { countAppointmentsByPatient } from "@/actions/appointments/count-appointments-by-patient";
import { getAppointmentsByPatient } from "@/actions/appointments/get-appointments-by-patient";
import { countPrescriptionsByPatient } from "@/actions/prescriptions/count-prescriptions-by-patient";
import { getLastVisitByPatient } from "@/actions/consultations/get-last-visit-by-patient";
import { getDoctors } from "@/actions/doctors/get-doctors";
import { getPatientInvoices } from "@/actions/billing/get-patient-invoices";
import { getDocumentsByPatient } from "@/actions/documents/get-documents-by-patient";

type PatientProfilePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PatientProfilePage({
  params,
}: PatientProfilePageProps) {
  const { id } = await params;

  const patient = await getPatient(id);
  const totalAppointments = await countAppointmentsByPatient(id);
  const appointments = await getAppointmentsByPatient(id);
  const totalPrescriptions = await countPrescriptionsByPatient(id);
  const lastVisit = await getLastVisitByPatient(id);
  const timeline = await getPatientTimeline(id);
  const doctors = await getDoctors();
  const invoices = await getPatientInvoices(patient.id);
  const documents = await getDocumentsByPatient(patient.id);

  return (
    <DashboardShell>
      <PageContainer>
        <PatientProfileClient
          patient={patient}
          totalAppointments={totalAppointments}
          appointments={appointments}
          totalPrescriptions={totalPrescriptions}
          lastVisit={lastVisit}
          timeline={timeline}
          doctors={doctors}
          invoices={invoices}
          documents={documents}
        />
      </PageContainer>
    </DashboardShell>
  );
}