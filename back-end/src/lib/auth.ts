import "dotenv/config";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "../db";
import * as authSchema from "../db/auth-schema";
import { resend } from "./resend";
import { buildVerificationEmail } from "./email-templates/verification-email";

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error("BETTER_AUTH_SECRET environment variable is required");
}

if (!process.env.BETTER_AUTH_URL) {
  throw new Error("BETTER_AUTH_URL environment variable is required");
}

if (!process.env.FRONTEND_URL) {
  throw new Error("FRONTEND_URL environment variable is required");
}

if (!process.env.EMAIL_FROM) {
  throw new Error("EMAIL_FROM environment variable is required");
}

if (!process.env.EMAIL_VERIFICATION_CALLBACK_URL) {
  throw new Error(
    "EMAIL_VERIFICATION_CALLBACK_URL environment variable is required",
  );
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),

  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [process.env.FRONTEND_URL],

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: false,

    sendVerificationEmail: async ({ user, url }) => {
      const verificationUrl = new URL(url);

      verificationUrl.searchParams.set(
        "callbackURL",
        process.env.EMAIL_VERIFICATION_CALLBACK_URL!,
      );

      const finalUrl = verificationUrl.toString();

      const { error } = await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: user.email,
        subject: "Vérifie ton adresse email",
        html: buildVerificationEmail(finalUrl),
      });

      if (error) {
        console.error("Resend verification email error:", error);
        throw new Error("Failed to send verification email");
      }
    },
  },
});