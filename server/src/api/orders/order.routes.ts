import { Router } from "express";
import { placeOrder } from "./order.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authenticate, placeOrder);

export default router;
