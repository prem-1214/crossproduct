import { Router } from "express";
import authRoutes from "./auth/auth.routes";
import adminRoutes from "./users/admin/admin.routes";
import productRoutes from "./products/product.routes";

const router = Router();

router.use("/auth", authRoutes);
// router.use("/user", userRoutes);
// router.use("/seller", sellerRoutes);
router.use("/admin", adminRoutes);
router.use("/product", productRoutes);

export default router;
