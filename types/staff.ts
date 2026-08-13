import { UserRole } from "./enums";

export type Staff = {
  id: string;

  name: string;

  email: string;

  phone: string;

  role: UserRole;

  active: boolean;
};
