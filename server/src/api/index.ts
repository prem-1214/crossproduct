import { Router } from "express";
import authRoutes from "./auth/auth.routes";
import adminRoutes from "./users/admin/admin.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);

export default router;
