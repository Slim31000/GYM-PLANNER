import "dotenv/config";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "../db"; 
import * as authSchema from "../db/auth-schema";

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error("BETTER_AUTH_SECRET environment variable is required");
}
if (!process.env.BETTER_AUTH_URL) {
  throw new Error("BETTER_AUTH_URL environment variable is required");
}
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", 
        schema: authSchema,
    }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins:[process.env.FRONTEND_URL!],
  emailAndPassword: {
    enabled: true,
  },
});