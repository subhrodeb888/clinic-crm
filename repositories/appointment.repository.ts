import { and, desc, eq, gte, ilike, lte, or, count, sql } from "drizzle-orm";

import { db } from "@/db";

import { appointments, doctors, patients, users } from "@/db/schema";

import type {
  AppointmentSearchInput,
  CreateAppointmentInput,
  UpdateAppointmentInput,
} from "@/validations/appointment.schema";

type AppointmentInsert = {
  patientId: string;

  doctorId: string;

  appointmentDate: string;

  startTime: string;

  endTime: string;

  status: string;

  queueStatus: string;

  reason?: string;

  notes?: string;
};

export class AppointmentRepository {
  private appointmentQuery() {
    return db
      .select({
        id: appointments.id,

        patientId: appointments.patientId,

        doctorId: appointments.doctorId,

        appointmentDate: appointments.appointmentDate,

        startTime: appointments.startTime,

        endTime: appointments.endTime,

        status: appointments.status,

        queueStatus: appointments.queueStatus,

        reason: appointments.reason,

        notes: appointments.notes,

        createdAt: appointments.createdAt,

        patient: {
          id: patients.id,

          firstName: patients.firstName,

          lastName: patients.lastName,

          phone: patients.phone,
        },

        doctor: {
          id: doctors.id,

          name: users.name,

          specialization: doctors.specialization,
        },
      })
      .from(appointments)
      .leftJoin(patients, eq(appointments.patientId, patients.id))
      .leftJoin(doctors, eq(appointments.doctorId, doctors.id))
      .leftJoin(users, eq(doctors.userId, users.id));
  }

  async createAppointment(data: AppointmentInsert) {
    const [appointment] = await db
      .insert(appointments)
      .values(data)
      .returning();

    return appointment;
  }

  async updateAppointment(id: string, data: UpdateAppointmentInput) {
    const [appointment] = await db
      .update(appointments)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(appointments.id, id))
      .returning();

    return appointment;
  }

  async deleteAppointment(id: string) {
    const [appointment] = await db
      .delete(appointments)
      .where(eq(appointments.id, id))
      .returning();

    return appointment;
  }

  async getAppointmentById(id: string) {
    const [appointment] = await this.appointmentQuery().where(
      eq(appointments.id, id),
    );

    return appointment ?? null;
  }

  async getAppointments(
    startDate?: string,
    endDate?: string,
    doctorId?: string,
    status?: string,
  ) {
    const conditions = [];

    if (startDate) {
      conditions.push(gte(appointments.appointmentDate, startDate));
    }

    if (endDate) {
      conditions.push(lte(appointments.appointmentDate, endDate));
    }

    if (doctorId) {
      conditions.push(eq(appointments.doctorId, doctorId));
    }

    if (status) {
      conditions.push(eq(appointments.status, status));
    }

    return this.appointmentQuery()
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(appointments.appointmentDate))
      .limit(500);
  }

  async getTodaysAppointments(doctorId?: string) {
    const conditions = [
      sql`DATE(${appointments.appointmentDate}) = CURRENT_DATE`,
    ];

    if (doctorId) {
      conditions.push(eq(appointments.doctorId, doctorId));
    }

    return this.appointmentQuery()
      .where(and(...conditions))
      .orderBy(desc(appointments.startTime));
  }

  async getAppointmentsByPatient(patientId: string) {
    return this.appointmentQuery().where(eq(appointments.patientId, patientId));
  }

  async getAppointmentsByDoctor(doctorId: string) {
    return this.appointmentQuery().where(eq(appointments.doctorId, doctorId));
  }

  async getAppointmentsByDoctorAndDate(
    doctorId: string,
    appointmentDate: string,
  ) {
    return this.appointmentQuery().where(
      and(
        eq(appointments.doctorId, doctorId),
        eq(appointments.appointmentDate, appointmentDate),
      ),
    );
  }

  async getAppointmentsByDate(appointmentDate: string) {
    return this.appointmentQuery().where(
      eq(appointments.appointmentDate, appointmentDate),
    );
  }

  async searchAppointments(filters: AppointmentSearchInput) {
    const conditions = [];

    if (filters.patientId) {
      conditions.push(eq(appointments.patientId, filters.patientId));
    }

    if (filters.doctorId) {
      conditions.push(eq(appointments.doctorId, filters.doctorId));
    }

    if (filters.status) {
      conditions.push(eq(appointments.status, filters.status));
    }

    if (filters.queueStatus) {
      conditions.push(eq(appointments.queueStatus, filters.queueStatus));
    }

    if (filters.appointmentDate) {
      conditions.push(
        eq(appointments.appointmentDate, filters.appointmentDate),
      );
    }

    if (filters.query) {
      conditions.push(
        or(
          ilike(patients.firstName, `%${filters.query}%`),
          ilike(patients.lastName, `%${filters.query}%`),
          ilike(users.name, `%${filters.query}%`),
        )!,
      );
    }

    return this.appointmentQuery().where(
      conditions.length ? and(...conditions) : undefined,
    );
  }

  async updateQueueStatus(id: string, queueStatus: string) {
    const [appointment] = await db
      .update(appointments)
      .set({
        queueStatus,
        updatedAt: new Date(),
      })
      .where(eq(appointments.id, id))
      .returning();

    return appointment;
  }

  async countAppointmentsByPatient(patientId: string) {
    const [result] = await db
      .select({
        count: count(),
      })
      .from(appointments)
      .where(eq(appointments.patientId, patientId));

    return Number(result.count);
  }

  async updateAppointmentStatus(id: string, status: string) {
    const [appointment] = await db
      .update(appointments)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(eq(appointments.id, id))
      .returning();

    return appointment;
  }
}

export const appointmentRepository = new AppointmentRepository();
