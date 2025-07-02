import { z } from "zod";

export const productFormSchema = z
  .object({
    productName: z.string().min(1, "Product name is required"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
    price: z.coerce.number().min(1, "Price must be greater than 0"),
    stock: z.coerce.number().min(0, "Stock cannot be negative"),
    category: z.string().min(1, "Category is required"),
    image1: z
      .any()
      .refine(
        (fileList) =>
          fileList instanceof FileList &&
          fileList.length > 0 &&
          fileList[0] instanceof File,
        { message: "Invalid file type" }
      ),
    image2: z.any().optional(),
    image3: z.any().optional(),
    image4: z.any().optional(),
  })
  .refine((data) => data.image1 || data.image2 || data.image3 || data.image4, {
    message: "At least one image is required",
    path: ["image"], // Attach error to the first field
  });

export type ProductFormFields = z.infer<typeof productFormSchema>;
