import { Router } from "express";
import {
  handleRegister,
  handleLogin,
  handleLogout,
  refreshAccessToken,
} from "./auth.controller";
import { validate } from "../../validations/zodValidation.middleware";
import { loginSchema, registerSchema } from "../../validations/auth.validation";

const router = Router();

router.route("/register").post(validate(registerSchema), handleRegister);

router.route("/login").post(validate(loginSchema), handleLogin);

router.route("/logout").get(handleLogout);

router.route("/refrsh-token").post(refreshAccessToken);

export default router;
