import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";

export type User = typeof users.$inferSelect;

export class UserRepository {
  async getByEmail(email: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    return user ?? null;
  }
}

export const userRepository = new UserRepository();
