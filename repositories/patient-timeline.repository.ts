import { desc, eq } from "drizzle-orm";

import { db } from "@/db";

import { appointments, consultations, prescriptions } from "@/db/schema";

import { PatientTimelineEvent } from "@/types/patient-timeline";

export class PatientTimelineRepository {
  async getAppointmentEvents(
    patientId: string,
  ): Promise<PatientTimelineEvent[]> {
    const appointmentsList = await db
      .select({
        id: appointments.id,
        createdAt: appointments.createdAt,
        appointmentDate: appointments.appointmentDate,
        startTime: appointments.startTime,
        reason: appointments.reason,
      })
      .from(appointments)
      .where(eq(appointments.patientId, patientId))
      .orderBy(desc(appointments.createdAt));

    return appointmentsList.map((appointment) => ({
      id: appointment.id,
      type: "appointment",
      title: "Appointment Booked",
      description: appointment.reason ?? "Appointment scheduled",
      createdAt: appointment.createdAt,
    }));
  }

  async getConsultationEvents(
    patientId: string,
  ): Promise<PatientTimelineEvent[]> {
    const consultationsList = await db
      .select({
        id: consultations.id,
        createdAt: consultations.createdAt,
        diagnosis: consultations.diagnosis,
        status: consultations.status,
      })
      .from(consultations)
      .where(eq(consultations.patientId, patientId))
      .orderBy(desc(consultations.createdAt));

    return consultationsList.map((consultation) => ({
      id: consultation.id,
      type: "consultation",
      title:
        consultation.status === "completed"
          ? "Consultation Completed"
          : "Consultation Draft Saved",
      description: consultation.diagnosis ?? "No diagnosis recorded",
      createdAt: consultation.createdAt,
    }));
  }

  async getPrescriptionEvents(
    patientId: string,
  ): Promise<PatientTimelineEvent[]> {
    const prescriptionsList = await db
      .select({
        id: prescriptions.id,
        createdAt: prescriptions.createdAt,
      })
      .from(prescriptions)
      .innerJoin(
        consultations,
        eq(prescriptions.consultationId, consultations.id),
      )
      .where(eq(consultations.patientId, patientId))
      .orderBy(desc(prescriptions.createdAt));

    return prescriptionsList.map((prescription) => ({
      id: prescription.id,
      type: "prescription",
      title: "Prescription Issued",
      description: "Prescription generated",
      createdAt: prescription.createdAt,
    }));
  }

  async getPatientTimeline(patientId: string): Promise<PatientTimelineEvent[]> {
    const [appointmentEvents, consultationEvents, prescriptionEvents] =
      await Promise.all([
        this.getAppointmentEvents(patientId),
        this.getConsultationEvents(patientId),
        this.getPrescriptionEvents(patientId),
      ]);

    return [
      ...appointmentEvents,
      ...consultationEvents,
      ...prescriptionEvents,
    ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

export const patientTimelineRepository = new PatientTimelineRepository();
