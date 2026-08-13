import type { Role } from "./roles";

export const permissions = {
  admin: ["*"],

  doctor: [
    "patients.read",
    "appointments.read",
    "consultations.manage",
    "ai.generate",
  ],

  receptionist: [
    "patients.manage",
    "appointments.manage",
    "billing.manage",
    "reminders.manage",
  ],
} as const;

/**
 * Authorization rules for the application.
 *
 * - `*` grants everything (admin).
 * - A `resource.manage` permission implies `resource.read` for the same
 *   resource (you must be able to read a record in order to manage it). This is
 *   intentional and does not weaken the model: it simply lets a receptionist
 *   who can manage patients also read them, a doctor who can read patients view
 *   a patient's full profile, etc.
 *
 * Server actions and API routes are the source of truth; UI gating is a
 * convenience that mirrors this function.
 */
export function can(
  role: Role | string | undefined | null,
  permission: string,
): boolean {
  if (!role) return false;

  const list = permissions[role as Role];
  if (!list) return false;

  const granted = list as readonly string[];
  if (granted.includes("*")) return true;
  if (granted.includes(permission)) return true;

  const dot = permission.indexOf(".");
  if (dot !== -1) {
    const resource = permission.slice(0, dot);
    const action = permission.slice(dot + 1);
    if (action === "read" && granted.includes(`${resource}.manage`)) {
      return true;
    }
  }

  return false;
}
