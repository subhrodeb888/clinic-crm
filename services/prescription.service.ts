// Import the prescription repository
import { prescriptionRepository } from "@/repositories/prescription.repository";

// Import the input type
import type { CreatePrescriptionInput } from "@/validations/prescription.schema";

import type { PrescriptionWithMedicines } from "@/types/prescription-model";

// Service responsible for prescription business logic
export class PrescriptionService {
  // Create a prescription
  async createPrescription(data: CreatePrescriptionInput) {
    // Call the repository
    return prescriptionRepository.createPrescription(data);
  }

  // Count prescriptions for a patient
  async countPrescriptionsByPatient(patientId: string) {
    // Call the repository
    return prescriptionRepository.countPrescriptionsByPatient(patientId);
  }

  async getPrescriptionByConsultation(
    consultationId: string,
  ): Promise<PrescriptionWithMedicines | null> {
    return prescriptionRepository.getPrescriptionByConsultation(consultationId);
  }

  async updatePrescription(
    consultationId: string,
    prescriptionId: string,
    medicines: {
      medicine: string;
      dosage: string;
      frequency: string;
      duration: number;
      instructions?: string;
    }[],
  ) {
    return prescriptionRepository.updatePrescription(
      consultationId,
      prescriptionId,
      medicines,
    );
  }
}

// Create a reusable service instance
export const prescriptionService = new PrescriptionService();
