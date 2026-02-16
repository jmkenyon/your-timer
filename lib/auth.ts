import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { sendEmailVerification, sendWelcomeEmail } from "./email";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, token }) => {
      await sendEmailVerification({
        to: user.email,
        token,
      });
    },
    onEmailVerified: async ({ user }: { user: { email: string } }) => {
      await sendWelcomeEmail({
        to: user.email,
      });
    },
  }
});
