import { createHash, timingSafeEqual } from "node:crypto";

import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { can } from "@/lib/auth/permissions";
import type { Role } from "@/lib/auth/roles";

export type ApiPrincipal =
  | { kind: "session"; userId: string; role: Role }
  | { kind: "apiKey" };

/**
 * Resolves the caller of an /api/ai/* route: either an authenticated browser
 * session (a staff member) or the shared booking-agent API key. Returns null
 * when neither is present.
 */
export async function apiPrincipal(
  request: NextRequest,
): Promise<ApiPrincipal | null> {
  const session = await auth();

  if (session?.user?.id) {
    return {
      kind: "session",
      userId: session.user.id,
      role: (session.user.role as Role) ?? "receptionist",
    };
  }

  if (hasValidApiKey(request)) {
    return { kind: "apiKey" };
  }

  return null;
}

export function hasValidApiKey(request: NextRequest): boolean {
  const header = request.headers.get("authorization");

  if (!header?.startsWith("Bearer ")) {
    return false;
  }

  const provided = header.slice("Bearer ".length).trim();
  const expected = process.env.CRM_API_KEY;

  if (!expected) {
    return false;
  }

  // Constant-time comparison to avoid timing attacks on the shared key.
  const providedDigest = createHash("sha256").update(provided, "utf8").digest();
  const expectedDigest = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(providedDigest, expectedDigest);
}

/**
 * Permission check for an API principal. The shared API key represents the
 * trusted booking agent and is allowed the booking workflow (patients,
 * doctors, slots, appointments). Session principals are checked against their
 * role via the permission map.
 */
export function principalCan(
  principal: ApiPrincipal,
  permission: string,
): boolean {
  if (principal.kind === "apiKey") {
    return true;
  }

  return can(principal.role, permission);
}

export function unauthorizedResponse(): NextResponse {
  return NextResponse.json(
    { success: false, message: "Unauthorized." },
    { status: 401 },
  );
}

export function forbiddenResponse(): NextResponse {
  return NextResponse.json(
    { success: false, message: "Forbidden." },
    { status: 403 },
  );
}
