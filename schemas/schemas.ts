import z from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const registerSchema = z.object({
  email: z.email("Invalid email"),

  password: z
    .string()
    .min(8, "The password should be at least 8 characters"),

  companyName: z
    .string()
    .min(3, "Company name must have at least 3 characters")
    .max(63, "Company name can't have more than 63 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;