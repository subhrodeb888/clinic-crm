import { db } from "@/db";

import { activityLogs } from "@/db/schema";

type CreateActivityLogInput = {
  userId?: string | null;

  action: string;

  entityType: string;

  entityId: string;

  metadata?: Record<string, unknown>;
};

export class ActivityRepository {
  async createLog(data: CreateActivityLogInput) {
    const [log] = await db
      .insert(activityLogs)
      .values({
        userId: data.userId ?? null,

        action: data.action,

        entityType: data.entityType,

        entityId: data.entityId,

        metadata: data.metadata ?? {},
      })
      .returning();

    return log;
  }

  async getPatientLogs(
  patientId: string
) {
  return db.query.activityLogs.findMany({
    where: (
      log,
      { eq }
    ) =>
      eq(
        log.entityId,
        patientId
      ),

    orderBy: (
      log,
      { desc }
    ) => [
      desc(
        log.createdAt
      ),
    ],
  });
}
}

export const activityRepository = new ActivityRepository();
