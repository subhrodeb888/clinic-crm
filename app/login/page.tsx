import { redirect } from "next/navigation";
import { DemoLoginButton } from "@/components/auth/demo-login-button";

import { auth } from "@/auth";
import { signInWithGoogle } from "@/actions/auth/sign-in";
import { demoLogin } from "@/actions/auth/demo-login";

export const metadata = {
  title: "Sign in · Clinic Dashboard",
};

// Seeded demo users (see db/seed.ts).
// Display labels only — the session's id/role are always resolved
// from the database by the Auth.js callbacks.
const DEMO_USERS = [
  {
    label: "Admin",
    email: "admin@sunriseclinic.in",
    role: "admin",
  },
  {
    label: "Receptionist",
    email: "reception1@sunriseclinic.in",
    role: "receptionist",
  },
  {
    label: "Receptionist 2",
    email: "reception2@sunriseclinic.in",
    role: "receptionist",
  },
  {
    label: "Dr. Amit Roy",
    email: "dr.amit.roy@sunriseclinic.in",
    role: "doctor",
  },
  {
    label: "Dr. Priya Sen",
    email: "dr.priya.sen@sunriseclinic.in",
    role: "doctor",
  },
  {
    label: "Dr. Rajesh Verma",
    email: "dr.rajesh.verma@sunriseclinic.in",
    role: "doctor",
  },
  {
    label: "Dr. Sunita Iyer",
    email: "dr.sunita.iyer@sunriseclinic.in",
    role: "doctor",
  },
];

export default async function LoginPage() {
  const session = await auth();

  // Authenticated users never see the login page.
  if (session?.user?.id) {
    redirect("/dashboard");
  }

  const demoLoginEnabled = process.env.DEMO_LOGIN_ENABLED === "true";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
          C
        </div>

        <h1 className="mt-6 text-2xl font-semibold text-gray-900">
          Clinic Dashboard
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Sign in with your clinic Google account to continue.
        </p>

        <form action={signInWithGoogle} className="mt-8">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.86 3c2.26-2.09 3.56-5.17 3.56-8.82z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
              />
            </svg>
            Sign in with Google
          </button>
        </form>

        <p className="mt-6 text-xs text-gray-400">
          Access is restricted to authorized clinic staff.
        </p>

        {demoLoginEnabled && (
          <div className="mt-6 border-t border-dashed border-gray-200 pt-6 text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
              Demo Login
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Sign in as a seeded user to explore different roles and
              permissions.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {DEMO_USERS.map((demoUser) => (
                <form
                  key={demoUser.email}
                  action={demoLogin.bind(null, demoUser.email)}
                >
                  <DemoLoginButton
                    label={demoUser.label}
                    role={demoUser.role}
                  />
                </form>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
