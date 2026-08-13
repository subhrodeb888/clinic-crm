export const ROLES = {
  ADMIN: "admin",
  DOCTOR: "doctor",
  RECEPTIONIST: "receptionist",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
