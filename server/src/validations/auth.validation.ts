import { z } from "zod";

const registerSchema = z.object({
  email: z
    .string()
    .email({ message: "please provide a valid email address" })
    .transform((val) => val.trim().toLowerCase()),
  password: z
    .string()
    .min(8, { message: "Password must be 8 characters long" })
    .transform((val) => val.trim()),
});

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "please provide a valid email address" })
    .transform((val) => val.trim().toLowerCase()),
  password: z
    .string()
    .min(8, { message: "Password must be 8 characters long" })
    .transform((val) => val.trim()),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export { registerSchema, loginSchema };
