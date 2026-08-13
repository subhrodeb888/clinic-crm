import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;

      role: string;

      name?: string | null;

      email?: string | null;

      image?: string | null;
    };
  }

  interface User {
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    // Populated from the users table by the jwt callback in auth.ts.
    // Optional: absent until the callback resolves the database user.
    id?: string;

    role?: string;
  }
}
