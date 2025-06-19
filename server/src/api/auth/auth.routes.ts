import { Router, Request, Response } from "express";
import { handleRegister, handleLogin } from "./auth.controller";
import { validate } from "../../middlewares/validation.middleware";
import { loginSchema, registerSchema } from "../../validations/auth.validation";

const router = Router();

router.route("/register").post(validate(registerSchema), handleRegister);

router
  .route("/login")
  .get((req: Request, res: Response) => {
    res.send("login page");
  })
  .post(validate(loginSchema), handleLogin);

export default router;
