import { Router } from "express";
import { checkRole } from "../../../middlewares/auth.middleware";
import { authenticate } from "../../../middlewares/auth.middleware";
import { getAllOrders, updateStatus } from "../../orders/order.controller";

const router = Router();

router.route("/orders").get(authenticate, checkRole("seller"), getAllOrders);

router
  .route("/orders/:id/status")
  .patch(authenticate, checkRole("seller"), updateStatus);

export default router;
