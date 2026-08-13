import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageContainer } from "@/components/layout/page-container";

import { ConsultationWorkspace } from "@/features/consultations/components/workspace/consultation-workspace";

import { getPatientConsultationHistory } from "@/actions/consultations/get-patient-consultation-history";
import { getAppointment } from "@/actions/appointments/get-appointment";
import { getConsultationByAppointment } from "@/actions/consultations/get-consultation-by-appointment";
import { getPrescriptionByConsultation } from "@/actions/prescriptions/get-prescription-by-consultation";

type DoctorConsultationsPageProps = {
  params: Promise<{
    appointmentId: string;
  }>;
};

export default async function DoctorConsultationsPage({
  params,
}: DoctorConsultationsPageProps) {
  const { appointmentId } = await params;

  const appointment = await getAppointment(appointmentId);

  const consultation = await getConsultationByAppointment(appointmentId);

  const prescription = consultation
    ? await getPrescriptionByConsultation(consultation.id)
    : null;

  const patient = appointment.patient;

  const consultationHistory = await getPatientConsultationHistory(patient.id);

  const timelineEvents = consultationHistory.map((consultation) => ({
    date: consultation.createdAt,
    event: consultation.diagnosis
      ? `Diagnosis: ${consultation.diagnosis}`
      : "Consultation completed",
  }));

  if (!patient) {
    return null;
  }

  return (
    <DashboardShell>
      <PageContainer>
        <ConsultationWorkspace
          appointment={appointment}
          patient={patient}
          consultation={consultation}
          consultationHistory={consultationHistory}
          timelineEvents={timelineEvents}
          prescription={prescription}
        />
      </PageContainer>
    </DashboardShell>
  );
}
