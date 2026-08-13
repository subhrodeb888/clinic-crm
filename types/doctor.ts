export type Doctor = {
  id: string;

  firstName: string;
  lastName: string;

  specialization: string;

  phone?: string;
  email?: string;

  experienceYears?: number;

  availableToday: boolean;

  avatar?: string;
};
