import { z } from "zod";

export const checkoutSchema = z.object({
  shippingAddress: z.object({
    fullName: z.string().min(1),
    address: z.string().min(1),
    city: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().min(1),
  }),
  paymentMethod: z.enum(["COD", "Stripe"]),
});
