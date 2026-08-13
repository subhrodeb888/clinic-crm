// Import the database connection
import { db } from "@/db";

// Import database tables
import { prescriptions, prescriptionItems, consultations } from "@/db/schema";

// Import Drizzle helper functions
import { count, eq } from "drizzle-orm";

// Define the input shape for creating a prescription
type CreatePrescriptionInput = {
  // ID of the consultation
  consultationId: string;

  // List of medicines
  medicines: {
    // Medicine name
    medicine: string;

    // Dosage (e.g. 500mg)
    dosage: string;

    // How often to take it
    frequency: string;

    // Number of days
    duration: number;

    // Optional extra instructions
    instructions?: string;
  }[];
};

// Repository responsible for prescription database operations
export class PrescriptionRepository {
  // Create a prescription and its medicines
  async createPrescription(data: CreatePrescriptionInput) {
    // Insert a prescription
    const [prescription] = await db
      .insert(prescriptions) // Into prescriptions table
      .values({
        consultationId: data.consultationId, // Save consultation ID
      })
      .returning(); // Return inserted row

    // Insert all medicine items
    await db.insert(prescriptionItems).values(
      // Convert each medicine into a database row
      data.medicines.map((medicine) => ({
        prescriptionId: prescription.id, // Link to prescription

        medicineName: medicine.medicine, // Medicine name

        dosage: medicine.dosage, // Dosage

        frequency: medicine.frequency, // Frequency

        durationDays: medicine.duration, // Duration

        instructions: medicine.instructions, // Instructions
      })),
    );

    // Return created prescription
    return prescription;
  }

  // Count prescriptions for one patient
  async countPrescriptionsByPatient(patientId: string) {
    // Query database
    const [result] = await db
      .select({
        count: count(), // Count rows
      })
      .from(prescriptions) // Start from prescriptions
      .innerJoin(
        consultations, // Join consultations
        eq(prescriptions.consultationId, consultations.id), // Match consultation IDs
      )
      .where(eq(consultations.patientId, patientId)); // Filter by patient

    // Convert database count to number
    return Number(result.count);
  }

  async getPrescriptionByConsultation(consultationId: string) {
    const [prescription] = await db
      .select()
      .from(prescriptions)
      .where(eq(prescriptions.consultationId, consultationId));

    if (!prescription) {
      return null;
    }

    const medicines = await db
      .select()
      .from(prescriptionItems)
      .where(eq(prescriptionItems.prescriptionId, prescription.id));

    return {
      ...prescription,
      medicines,
    };
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
    await db
      .delete(prescriptionItems)
      .where(eq(prescriptionItems.prescriptionId, prescriptionId));

    await db.insert(prescriptionItems).values(
      medicines.map((medicine) => ({
        prescriptionId,
        medicineName: medicine.medicine,
        dosage: medicine.dosage,
        frequency: medicine.frequency,
        durationDays: medicine.duration,
        instructions: medicine.instructions,
      })),
    );

    return this.getPrescriptionByConsultation(consultationId);
  }
}

// Create a reusable repository instance
export const prescriptionRepository = new PrescriptionRepository();
