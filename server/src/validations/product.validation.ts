import { z } from "zod";

export const productSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(0, "Price must be a positive number"),
  stock: z.number().int().min(0, "Stock must be a non-negative number"),
  category: z.string().min(1, "Category is required"),
  image: z.string(),
  seller: z.string().min(1, "Seller ID is required"),
  rating: z.number().min(0).max(5).optional().default(0),
  numreviews: z.number().int().min(0).optional().default(0),
});

export type ProductInput = z.infer<typeof productSchema>;
