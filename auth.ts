import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { userRepository } from "@/repositories/user.repository";

const providers: Provider[] = [Google];

if (process.env.NODE_ENV === "development") {
  providers.push(
    Credentials({
      id: "demo-login",
      name: "Demo Login",
      credentials: {
        email: { label: "Email", type: "text" },
      },
      async authorize(credentials) {
        if (process.env.NODE_ENV !== "development") {
          return null;
        }

        const email =
          typeof credentials?.email === "string" ? credentials.email : null;

        if (!email) {
          return null;
        }

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

  session: {
    strategy: "jwt",
  },

  callbacks: {
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
