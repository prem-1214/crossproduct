import { Request, Response } from "express";
import { Product } from "../../models/product.model";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendSuccess } from "../../utils/responseHelper";
import { AppError } from "../../utils/AppError";
import { ProductInput } from "../../validations/product.validation";
import { uploadOnCloudinary } from "../../utils/cloudinaryUploader";

// Create product (Seller Only)
export const addProduct = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body as ProductInput;
  const files = req.files as Express.Multer.File[];
  console.log("req.files:", req.files);

  if (!files || files.length === 0) {
    throw new AppError("Atleast 1 image is required...", 400);
  }

  // array to store image urls
  const imageUrls: string[] = [];

  for (const file of files) {
    const result = await uploadOnCloudinary(file.path);
    // console.log("cloudinary >>>>>", result);

    // push urls in the array
    imageUrls.push(result?.secure_url as string);
  }

  console.log("imageUrls :::", imageUrls);
  const product = await Product.create({
    ...data,
    seller: req.user?._id,
    images: imageUrls,
  });

  return sendSuccess(res, 201, "Product created successfully", product);
});

// specific to seller only (seller)
export const getmyProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const seller = req.user?._id as string;
    console.log("seller", seller);
    if (!seller) throw new AppError("seller not found", 500);
    const myProducts = await Product.find({ seller: seller });
    console.log("myProducts ...", myProducts);

    return sendSuccess(res, 200, "all products fetched", myProducts);
  }
);

// Get all products (public)
export const getAllProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const page = parseInt(req.params.page as string) || 1;
    const limit = parseInt(req.params.limit as string) || 30;
    const skip = (page - 1) * 30;

    // fetch total products by counting the entries
    const total = await Product.countDocuments();

    const products = await Product.find().skip(skip).limit(limit).lean();

    const productResponse = {
      products,
      page,
      total,
      pages: Math.ceil(total / limit),
    };

    return sendSuccess(res, 200, "Product list", productResponse);
  }
);

// Get single product by ID
export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);
    if (!product) throw new AppError("Product not found", 404);
    return sendSuccess(res, 200, "Product found", product);
  }
);

// Update product
export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) throw new AppError("Product not found", 404);

    return sendSuccess(res, 200, "Product updated", product);
  }
);

// Delete product
export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) throw new AppError("Product not found", 404);

    return sendSuccess(res, 200, "Product deleted", { _id: product._id });
  }
);
