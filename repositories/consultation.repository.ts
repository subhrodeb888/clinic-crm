import { eq, desc } from "drizzle-orm";

import { db } from "@/db";

import { consultations } from "@/db/schema";

type ConsultationInsert = {
  patientId: string;

  doctorId: string;

  appointmentId?: string;

  chiefComplaint?: string;

  diagnosis?: string;

  notes?: string;

  aiSummary?: string;
};

export class ConsultationRepository {
  async createConsultation(data: ConsultationInsert) {
    const [consultation] = await db
      .insert(consultations)
      .values(data)
      .returning();

    return consultation;
  }

  async getConsultationById(id: string) {
    const [consultation] = await db
      .select()
      .from(consultations)
      .where(eq(consultations.id, id));

    return consultation ?? null;
  }

  async getConsultationsByPatient(patientId: string) {
    return db
      .select()
      .from(consultations)
      .where(eq(consultations.patientId, patientId))
      .orderBy(desc(consultations.createdAt));
  }

  async completeConsultation(id: string) {
    const [consultation] = await db
      .update(consultations)
      .set({
        status: "completed",
      })
      .where(eq(consultations.id, id))
      .returning();

    return consultation;
  }

  async getConsultationByAppointment(appointmentId: string) {
    const [consultation] = await db
      .select()
      .from(consultations)
      .where(eq(consultations.appointmentId, appointmentId));

    return consultation ?? null;
  }

  async getLastVisitByPatient(patientId: string) {
    const [consultation] = await db
      .select({
        createdAt: consultations.createdAt,
      })
      .from(consultations)
      .where(eq(consultations.patientId, patientId))
      .orderBy(desc(consultations.createdAt))
      .limit(1);

    return consultation?.createdAt ?? null;
  }

  async updateConsultation(
    id: string,
    data: {
      chiefComplaint?: string;
      diagnosis?: string;
      notes?: string;
      aiSummary?: string;
    },
  ) {
    const [consultation] = await db
      .update(consultations)
      .set(data)
      .where(eq(consultations.id, id))
      .returning();

    return consultation;
  }
}

export const consultationRepository = new ConsultationRepository();
