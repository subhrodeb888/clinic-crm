import { desc, eq } from "drizzle-orm";

import { db } from "@/db";

import { doctors, users } from "@/db/schema";

export class DoctorRepository {
  private doctorQuery() {
    return db
      .select({
        id: doctors.id,

        userId: doctors.userId,

        name: users.name,

        specialization: doctors.specialization,
      })
      .from(doctors)
      .leftJoin(users, eq(doctors.userId, users.id));
  }

  async getDoctors() {
    return this.doctorQuery().orderBy(desc(doctors.createdAt));
  }

  async getDoctorsBySpecialization(specialization: string) {
    return this.doctorQuery()
      .where(eq(doctors.specialization, specialization))
      .orderBy(desc(doctors.createdAt));
  }

  async getDoctorById(id: string) {
    const [doctor] = await this.doctorQuery().where(eq(doctors.id, id));

    return doctor ?? null;
  }

  async getDoctorByUserId(userId: string) {
    const [doctor] = await this.doctorQuery().where(eq(doctors.userId, userId));

    return doctor ?? null;
  }
}

export const doctorRepository = new DoctorRepository();
