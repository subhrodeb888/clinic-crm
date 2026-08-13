export type PrescriptionMedicine = {
  id: string;

  prescriptionId: string;

  medicineName: string;

  dosage: string | null;

  frequency: string | null;

  durationDays: number | null;

  instructions: string | null;
};

export type PrescriptionWithMedicines = {
  id: string;

  consultationId: string;

  createdAt: Date;

  medicines: PrescriptionMedicine[];
};
