"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { userRepository } from "@/repositories/user.repository";

export async function demoLogin(email: string) {
  const demoLoginEnabled = process.env.DEMO_LOGIN_ENABLED === "true";

  if (!demoLoginEnabled) {
    throw new Error("Demo login is disabled.");
  }

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

    throw error;
  }
}
