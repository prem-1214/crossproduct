import { Router } from "express";
import { authenticate, checkRole } from "../../../middlewares/auth.middleware";
import {
  deleteUserHandler,
  getAllUserListHandler,
  updateUserHandler,
} from "./admin.controller";
import { updateStatus } from "../../orders/order.controller";

const router = Router();

router
  .route("/users")
  .get(authenticate, checkRole("admin"), getAllUserListHandler);

router
  .route("/users/:id")
  .delete(authenticate, checkRole("admin"), deleteUserHandler);

router
  .route("/users/:id")
  .patch(authenticate, checkRole("admin"), updateUserHandler);

router
  .route("/orders/:id/status")
  .patch(authenticate, checkRole("seller"), updateStatus);

export default router;
