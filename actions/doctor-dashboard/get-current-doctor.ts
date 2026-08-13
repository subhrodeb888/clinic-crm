import { requirePermission } from "@/lib/auth/guards";
import { doctorService } from "@/services/doctor.service";

/**
 * Shared server-side helper for the doctor dashboard (not a server action,
 * so no "use server" directive — same pattern as lib/auth/guards.ts).
 *
 * Resolves the doctor profile linked to the currently authenticated user:
 * session.user.id -> doctors.userId -> doctors.id. Throws when the caller is
 * unauthenticated, lacks the consultations.manage permission, or has no
 * linked doctor record.
 */
export async function getCurrentDoctor() {
  const session = await requirePermission("consultations.manage");

  return doctorService.getDoctorByUserId(session.user.id);
}
