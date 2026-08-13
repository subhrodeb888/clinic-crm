import { auth } from "@/auth";

import { can } from "./permissions";
import type { Role } from "./roles";

export class AuthorizationError extends Error {
  readonly code: "UNAUTHORIZED" | "FORBIDDEN";

  constructor(message: string, code: "UNAUTHORIZED" | "FORBIDDEN") {
    super(message);
    this.name = "AuthorizationError";
    this.code = code;
  }
}

/**
 * The single enforcement point for authentication. Every protected server
 * action and API route must call requireAuth (directly or via
 * requireRole/requirePermission).
 */
export async function requireAuth() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new AuthorizationError("Unauthorized", "UNAUTHORIZED");
  }

  return session;
}

export async function requireRole(role: Role) {
  const session = await requireAuth();

  if (session.user.role !== role) {
    throw new AuthorizationError("Forbidden", "FORBIDDEN");
  }

  return session;
}

export async function requirePermission(permission: string) {
  const session = await requireAuth();

  if (!can(session.user.role, permission)) {
    throw new AuthorizationError("Forbidden", "FORBIDDEN");
  }

  return session;
}
