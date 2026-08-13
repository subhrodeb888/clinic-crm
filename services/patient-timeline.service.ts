import { patientTimelineRepository } from "@/repositories/patient-timeline.repository";

export class PatientTimelineService {
  async getPatientTimeline(patientId: string) {
    return patientTimelineRepository.getPatientTimeline(patientId);
  }
}

export const patientTimelineService = new PatientTimelineService();
