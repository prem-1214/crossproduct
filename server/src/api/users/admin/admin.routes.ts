import { Router } from "express";
import { authenticate, checkRole } from "../../../middlewares/auth.middleware";
import { deleteUserHandler, getAllUserListHandler } from "./admin.controller";

const router = Router();

router
  .route("/users")
  .get(authenticate, checkRole("admin"), getAllUserListHandler);

router.route("/users/:id").delete(deleteUserHandler);

export default router;
