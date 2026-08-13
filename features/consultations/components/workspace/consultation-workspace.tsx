"use client";

import { useState } from "react";
import { Patient } from "@/types/patient";

import { ConsultationLayout } from "./consultation-layout";
import { ConsultationHeader } from "./consultation-header";

import { PatientSummaryPanel } from "./left-panel/patient-summary-panel";
import { TimelineSummaryPanel } from "./left-panel/timeline-summary-panel";
import { PreviousConsultationsPanel } from "./left-panel/previous-consultations-panel";

import { ConsultationForm } from "./right-panel/consultation-form";
import { PrescriptionBuilder } from "./right-panel/prescription-builder";
import { ConsultationActions } from "./right-panel/consultation-actions";

import type {
  ConsultationWithDetails,
  ConsultationHistoryItem,
  TimelineEvent,
} from "@/types/consultation-model";

import type { PrescriptionWithMedicines } from "@/types/prescription-model";

type ConsultationWorkspaceProps = {
  appointment: {
    id: string;

    startTime: string;

    doctor: {
      id: string;

      firstName: string;

      lastName: string;
    };
  };

  patient: Patient;

  consultationHistory: ConsultationHistoryItem[];

  timelineEvents: TimelineEvent[];

  consultation: ConsultationWithDetails | null;

  prescription: PrescriptionWithMedicines | null;
};

export function ConsultationWorkspace({
  appointment,
  patient,
  consultationHistory,
  timelineEvents,
  consultation,
  prescription,
}: ConsultationWorkspaceProps) {
  const [currentConsultation, setCurrentConsultation] =
    useState<ConsultationWithDetails | null>(consultation);

  const [currentPrescription, setCurrentPrescription] = useState(prescription);
  return (
    <div className="space-y-6">
      <ConsultationHeader
        patientName={`${patient.firstName} ${patient.lastName}`}
        appointmentTime={appointment.startTime}
        doctorName={`Dr. ${appointment.doctor.firstName} ${appointment.doctor.lastName}`}
      />

      <ConsultationLayout
        leftPanel={
          <>
            <PatientSummaryPanel patient={patient} />

            <TimelineSummaryPanel
              events={timelineEvents.map((item) => item.event)}
            />

            <PreviousConsultationsPanel
              consultations={consultationHistory.map((consultation) => ({
                id: consultation.id,
                date: consultation.createdAt.toISOString().split("T")[0],
                reason: consultation.diagnosis ?? "No diagnosis",
              }))}
            />
          </>
        }
        rightPanel={
          <>
            <div className="space-y-6">
              <ConsultationForm
                patientId={patient.id}
                doctorId={appointment.doctor.id}
                appointmentId={appointment.id}
                consultation={currentConsultation}
                onCreated={(consultationId) =>
                  setCurrentConsultation({
                    id: consultationId,
                    status: "draft",
                    chiefComplaint: "",
                    diagnosis: "",
                    notes: "",
                    aiSummary: "",
                  })
                }
              />

              <PrescriptionBuilder
                consultationId={currentConsultation?.id}
                appointmentId={appointment.id}
                prescription={prescription}
              />
            </div>

            <ConsultationActions
              consultationId={currentConsultation?.id}
              appointmentId={appointment.id}
              patientId={patient.id}
            />
          </>
        }
      />
    </div>
  );
}
