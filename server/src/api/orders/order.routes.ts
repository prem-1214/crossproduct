import { Router } from "express";
import { getMyOrders, getOrderById, placeOrder } from "./order.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authenticate, placeOrder);
router.get("/my-orders", authenticate, getMyOrders);
router.get("/my-orders/:id", authenticate, getOrderById);

export default router;
