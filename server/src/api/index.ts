import { Router } from "express";
import authRoutes from "./auth/auth.routes";
import adminRoutes from "./users/admin/admin.routes";
import productRoutes from "./products/product.routes";
import orderRoutes from "./orders/order.routes";

const router = Router();

router.use("/auth", authRoutes);
// router.use("/user", userRoutes);
// router.use("/seller", sellerRoutes);
router.use("/admin", adminRoutes);
router.use("/product", productRoutes);
router.use("/order", orderRoutes);

export default router;
