import { Router } from "express";
import {
  registerHandler,
  loginHandler,
  logoutHandler,
  refreshAccessTokenHAndler,
} from "./auth.controller";
import { validate } from "../../validations/zodValidation.middleware";
import { loginSchema, registerSchema } from "../../validations/auth.validation";

const router = Router();

router.route("/register").post(validate(registerSchema), registerHandler);

router.route("/login").post(validate(loginSchema), loginHandler);

router.route("/logout").get(logoutHandler);

router.route("/refresh-token").get(refreshAccessTokenHAndler);

export default router;
