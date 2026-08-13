export type Medicine = {
  medicine: string;

  dosage: string;

  frequency: string;

  duration: string;

  instructions: string;
};

export type PrescriptionFormValues = {
  medicines: Medicine[];
};
