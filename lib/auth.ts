import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { sendEmailVerification, sendWelcomeEmail } from "./email";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
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
    async afterEmailVerification(user) {
      await sendWelcomeEmail({
        to: user.email,
      });
    },
  }
});
