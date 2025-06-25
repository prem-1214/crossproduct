import { Router } from "express";
import { authenticate, checkRole } from "../../../middlewares/auth.middleware";
import { getAllUserListHandler } from "./admin.controller";

const router = Router();

router
  .route("/users")
  .get(authenticate, checkRole("admin"), getAllUserListHandler);

  
export default router;
