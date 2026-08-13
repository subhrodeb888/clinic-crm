import { activityRepository } from "@/repositories/activity.repository";

type LogActivityInput = {
  userId?: string | null;

  action: string;

  entityType: string;

  entityId: string;

  metadata?: Record<string, unknown>;
};

export class ActivityService {
  async log(data: LogActivityInput) {
    return activityRepository.createLog(data);
  }
}

export const activityService = new ActivityService();
