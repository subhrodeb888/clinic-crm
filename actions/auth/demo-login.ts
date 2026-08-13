"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { userRepository } from "@/repositories/user.repository";

/**
 * Development-only demo sign-in. Assumes the identity of an existing seeded
 * user via the "demo-login" Credentials provider (which is only registered
 * when NODE_ENV === "development"). The resulting session is a normal Auth.js
 * JWT session: session.user.id and session.user.role are populated from the
 * users table by the standard jwt/session callbacks, so all authorization
 * and permission checks run exactly as they do for Google sign-in.
 */
export async function demoLogin(email: string) {
  // Hard server-side gate: the action is inert outside development, even if
  // invoked directly (e.g. a replayed server-action request in production).
  if (process.env.NODE_ENV !== "development") {
    throw new Error("Demo login is only available in development.");
  }

  // Only existing, provisioned users can be assumed — nothing is created,
  // and unknown emails are rejected before Auth.js is even invoked.
  const user = await userRepository.getByEmail(email);

  if (!user) {
    throw new Error("Unknown demo user.");
  }

  try {
    await signIn("demo-login", {
      email,
      redirectTo: user.role === "doctor" ? "/doctors" : "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      throw new Error("Demo sign-in failed.");
    }

    // signIn throws NEXT_REDIRECT on success — it must propagate.
    throw error;
  }
}
