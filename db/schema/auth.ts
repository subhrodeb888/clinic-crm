import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),

  name: text("name"),

  email: text("email").notNull().unique(),

  image: text("image"),

  role: text("role").notNull().default("receptionist"),

  emailVerified: boolean("email_verified").notNull().default(false),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),

  userId: text("user_id").notNull(),

  type: text("type").notNull(),

  provider: text("provider").notNull(),

  providerAccountId: text("provider_account_id").notNull(),

  refreshToken: text("refresh_token"),

  accessToken: text("access_token"),

  expiresAt: integer("expires_at"),

  tokenType: text("token_type"),

  scope: text("scope"),

  idToken: text("id_token"),

  sessionState: text("session_state"),
});

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),

  userId: text("user_id").notNull(),

  expires: timestamp("expires").notNull(),
});

export const verificationTokens = pgTable("verification_tokens", {
  identifier: text("identifier").notNull(),

  token: text("token").notNull(),

  expires: timestamp("expires").notNull(),
});
