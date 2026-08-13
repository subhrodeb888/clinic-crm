import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { userRepository } from "@/repositories/user.repository";

const providers: Provider[] = [Google];

// Development-only demo login: assumes the identity of an EXISTING seeded
// user (looked up by email) so seeded accounts, roles, and RBAC can be tested
// locally without multiple Google accounts. The provider is only registered
// when running `next dev` (NODE_ENV === "development"); production builds
// never include it, so its sign-in callback endpoint does not exist there.
if (process.env.NODE_ENV === "development") {
  providers.push(
    Credentials({
      id: "demo-login",
      name: "Demo Login",
      credentials: {
        email: { label: "Email", type: "text" },
      },
      async authorize(credentials) {
        // Defense in depth: never issue a demo session outside development.
        if (process.env.NODE_ENV !== "development") {
          return null;
        }

        const email =
          typeof credentials?.email === "string" ? credentials.email : null;

        if (!email) {
          return null;
        }

        // Only existing, provisioned users can be assumed. No user is ever
        // created here, and the jwt callback below still re-resolves the
        // user's id and role from the database on every request.
        const user = await userRepository.getByEmail(email);

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  );
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,

  // JWT sessions: stateless, Edge-compatible (middleware), and do not require
  // the Drizzle adapter (the existing auth schema is not adapter-compatible).
  session: {
    strategy: "jwt",
  },

  callbacks: {
    // Resolve the provisioned clinic user from the database so that
    // session.user.id and session.user.role are populated on every request.
    // The users table is the source of truth for staff identity and roles.
    async jwt({ token }) {
      const dbUser = token.email
        ? await userRepository.getByEmail(token.email)
        : null;

      if (dbUser) {
        token.id = dbUser.id;
        token.role = dbUser.role;
      }

      return token;
    },

    session({ session, token }) {
      if (token.id && token.role) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
  },
});
