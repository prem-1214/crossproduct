import { Router } from "express";
import { authenticate, checkRole } from "../../../middlewares/auth.middleware";
import {
  deleteUserHandler,
  getAllUserListHandler,
  updateUserHandler,
} from "./admin.controller";

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

export default router;
