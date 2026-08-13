import { consultationRepository } from "@/repositories/consultation.repository";

import type { CreateConsultationInput } from "@/validations/consultation.schema";

import type {
  ConsultationHistoryItem,
  ConsultationWithDetails,
} from "@/types/consultation-model";

export class ConsultationService {
  async createConsultation(data: CreateConsultationInput) {
    return consultationRepository.createConsultation(data);
  }

  async getConsultationById(
    id: string,
  ): Promise<ConsultationWithDetails | null> {
    return consultationRepository.getConsultationById(id);
  }

  async getConsultationsByPatient(patientId: string) {
    return consultationRepository.getConsultationsByPatient(patientId);
  }

  async getConsultationByAppointment(appointmentId: string) {
    return consultationRepository.getConsultationByAppointment(appointmentId);
  }

  async getPatientConsultationHistory(
    patientId: string,
  ): Promise<ConsultationHistoryItem[]> {
    return consultationRepository.getConsultationsByPatient(patientId);
  }

  async getLastVisitByPatient(patientId: string) {
    return consultationRepository.getLastVisitByPatient(patientId);
  }

  async completeConsultation(id: string) {
    return consultationRepository.completeConsultation(id);
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
    return consultationRepository.updateConsultation(id, data);
  }
}

export const consultationService = new ConsultationService();
