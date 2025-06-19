import { AppError } from "../../utils/AppError";
import { asyncHandler } from "../../utils/asyncHandler";
import { Request, Response } from "express";
import { sendSuccess } from "../../utils/responseHelper";
import { User } from "../users/users.models";
import { LoginInput, RegisterInput } from "../../validations/auth.validation";
import { config } from "../../config/config";

const handleRegister = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as RegisterInput;

  if (!email || !password) {
    throw new AppError("Username and Password are required", 400);
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) throw new AppError("email already in use", 409);

  const user = await User.create({
    email,
    username: email.split("@")[0],
    password,
  });

  // sending success using responseHelper
  return sendSuccess(res, 200, "User Registration Successful", user);
});

const handleLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginInput;

  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new AppError("Invalid credentials", 401);

  const isPasswordCorrect = user.comparePassword(password);

  if (!isPasswordCorrect) throw new AppError("Password does not match", 401);

  const accessToken = user.generateAccessToken();
  const refreshtoken = user.generateRefreshToken();

  user.refreshtoken = refreshtoken;

  await user.save({ validateBeforeSave: false });

  type cookieOptions = {
    httpOnly: boolean;
    secure: boolean;
    sameSite: "strict";
    maxAge: number;
  };
  const options: cookieOptions = {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  res
    .cookie("refresh-token", refreshtoken, options)
    .setHeader("Authorization", `Bearer ${accessToken}`);

  return sendSuccess(res, 200, "logged in", {
    _id: user._id,
    email: user.email,
  });
});

export { handleRegister, handleLogin };
