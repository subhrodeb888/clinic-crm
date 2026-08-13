import { and, desc, eq, ilike, or, sql } from "drizzle-orm";

import { db } from "@/db";

import { patients } from "@/db/schema/patients";
import { doctors } from "@/db/schema/doctors";
import { users } from "@/db/schema/auth";

import type {
  CreatePatientInput,
  PatientSearchInput,
  UpdatePatientInput,
} from "@/validations/patient.schema";

export class PatientRepository {
  private patientQuery() {
    return db
      .select({
        id: patients.id,

        firstName: patients.firstName,

        lastName: patients.lastName,

        phone: patients.phone,

        email: patients.email,

        gender: patients.gender,

        dateOfBirth: patients.dateOfBirth,

        bloodGroup: patients.bloodGroup,

        notes: patients.notes,

        address: patients.address,

        emergencyContact: patients.emergencyContact,

        lastVisit: patients.lastVisit,

        balance: patients.balance,

        status: patients.status,

        createdAt: patients.createdAt,

        assignedDoctorId: patients.assignedDoctorId,

        assignedDoctor: users.name,
      })
      .from(patients)
      .leftJoin(doctors, eq(patients.assignedDoctorId, doctors.id))
      .leftJoin(users, eq(doctors.userId, users.id));
  }
  async createPatient(data: CreatePatientInput) {
    const [patient] = await db
      .insert(patients)
      .values({
        ...data,
      })
      .returning();

    return patient;
  }

  async updatePatient(id: string, data: UpdatePatientInput) {
    const [patient] = await db
      .update(patients)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(patients.id, id))
      .returning();

    return patient;
  }

  async deletePatient(id: string) {
    const [patient] = await db
      .delete(patients)
      .where(eq(patients.id, id))
      .returning();

    return patient;
  }

  async getPatientById(id: string) {
    const [patient] = await this.patientQuery().where(eq(patients.id, id));

    return patient ?? null;
  }

  async getPatients() {
    return this.patientQuery().orderBy(desc(patients.createdAt));
  }

  async searchPatients(filters: PatientSearchInput) {
    const conditions = [];

    if (filters.query) {
      conditions.push(
        or(
          ilike(patients.firstName, `%${filters.query}%`),
          ilike(patients.lastName, `%${filters.query}%`),
          ilike(patients.phone, `%${filters.query}%`),
          ilike(patients.email, `%${filters.query}%`),

          sql`concat(${patients.firstName}, ' ', ${patients.lastName}) ILIKE ${`%${filters.query}%`}`,
        ),
      );
    }

    if (filters.status) {
      conditions.push(eq(patients.status, filters.status));
    }

    if (filters.assignedDoctorId) {
      conditions.push(eq(patients.assignedDoctorId, filters.assignedDoctorId));
    }

    return this.patientQuery()
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(patients.createdAt));
  }

  async updatePatientBalance(id: string, balance: string) {
    const [patient] = await db
      .update(patients)
      .set({
        balance,
        updatedAt: new Date(),
      })
      .where(eq(patients.id, id))
      .returning();

    return patient;
  }

  async updateLastVisit(id: string, lastVisit: Date) {
    const [patient] = await db
      .update(patients)
      .set({
        lastVisit,
        updatedAt: new Date(),
      })
      .where(eq(patients.id, id))
      .returning();

    return patient;
  }
}

export const patientRepository = new PatientRepository();
