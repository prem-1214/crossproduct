import { z } from "zod";

export const updateUserSchema = z.object({
  email: z.string().email(),
  role: z.enum(["user", "seller", "admin"]),
  isVarifiedSeller: z.boolean(),
});
