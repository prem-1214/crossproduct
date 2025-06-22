import z from "zod";

export const loginSchema = z
  .object({
    email: z
      .string()
      .email({ message: "please provide valid email" })
      .transform((val) => val.trim().toLowerCase()),

    password: z
      .string()
      .min(8, { message: "Password must be 8 characters long" })
      .transform((val) => val.replace(/\s/g, "")),
  })
  .refine((data) => data.password.replace(/\s/g, "").length > 8, {
    message:
      "Password must be 8 character long. Avoid using whitspaces (Use special characters !@#$%^&* [a-z, A-Z, 0-9])",
    path: ["password"],
  });

export const registerSchema = z
  .object({
    email: z
      .string()
      .email({ message: "please provide valid email" })
      .transform((val) => val.trim().toLowerCase()),

    password: z
      .string()
      .min(8, { message: "Password must be 8 characters long" }),
  })
  .refine((data) => data.password.replace(/\s/g, "").length > 8, {
    message:
      "Password must be 8 character long. Avoid using whitspaces (Use special characters !@#$%^&* [a-z, A-Z, 0-9])",
    path: ["password"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
