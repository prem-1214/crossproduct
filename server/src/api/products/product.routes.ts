import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getmyProducts,
  getProductById,
  updateProduct,
} from "./product.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { checkRole } from "../../middlewares/auth.middleware";
import { uploadProductImage } from "../../middlewares/multer.middleware";

const router = Router();

// Public
router.get("/", getAllProducts);
router.get("/my-products", authenticate, checkRole("seller"), getmyProducts);
router.get("/:id", getProductById);

// Protected for seller only
router.post(
  "/add-product",
  authenticate,
  checkRole("seller"),
  uploadProductImage,
  addProduct
);
router.patch("/:id", authenticate, checkRole("seller"), updateProduct);
router.delete("/:id", authenticate, checkRole("seller"), deleteProduct);

export default router;
