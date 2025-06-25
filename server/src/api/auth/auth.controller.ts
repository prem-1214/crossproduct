import { AppError } from "../../utils/AppError";
import { asyncHandler } from "../../utils/asyncHandler";
import { Request, Response } from "express";
import { sendSuccess } from "../../utils/responseHelper";
import { User } from "../../models/users.models";
import { LoginInput, RegisterInput } from "../../validations/auth.validation";
import { config } from "../../config/config";
import jwt from "jsonwebtoken";

type cookieOptions = {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "strict" | "lax" | "none";
  maxAge?: number;
  path: string;
};

const registerHandler = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
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
  }
);

const loginHandler = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body as LoginInput;

    const user = await User.findOne({ email }).select("+password");

    if (!user) throw new AppError("Invalid credentials", 401);

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) throw new AppError("Password does not match", 401);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    const options: cookieOptions = {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    };

    res.clearCookie("refresh-token", options);
    res.cookie("refresh-token", refreshToken, options);

    return sendSuccess(res, 200, "logged in", {
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isVarifiedSeller: user.isVarifiedSeller,
      },
      accessToken: accessToken,
    });
  }
);

const logoutHandler = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    // refrshtoken from cookies
    const refreshToken: string = req.cookies["refresh-token"];
    // console.log("re", refreshToken)

    if (!refreshToken) throw new AppError("loged out", 401);

    // find user with existing refresh-token
    const user = await User.findOne({ refreshToken: refreshToken });

    if (user) {
      user.refreshToken = undefined; // set refresh-token undefined in db
      await user.save({ validateBeforeSave: false });
    }

    const options: cookieOptions = {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    };
    res.clearCookie("refresh-token", options);

    return sendSuccess(res, 200, "Logged out successfully");
  }
);

const refreshAccessTokenHAndler = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    // token from cookies
    const token = req.cookies["refresh-token"];

    if (!token) throw new AppError("RefreshToken missing", 401);

    let decoded;
    try {
      decoded = jwt.verify(token, config.REFRESH_TOKEN_SECRET as string) as {
        _id: string;
      };
    } catch {
      throw new AppError("Token expired or invalid", 403);
    }

    // select refrshtoken bacuase default select is false in db schema
    const existingUser = await User.findById(decoded._id as string).select(
      "+refreshToken"
    );
    // console.log("decoded", existingUser);

    if (!existingUser || existingUser.refreshToken !== token) {
      throw new AppError("Invalid refresh token", 403);
    }

    // rotate refresh token for security
    const newRefreshToken = existingUser.generateRefreshToken();
    existingUser.refreshToken = newRefreshToken;
    await existingUser.save({ validateBeforeSave: false });

    // console.log("token refreshed", existingUser);

    const newAccessToken = existingUser.generateAccessToken();

    const options: cookieOptions = {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    };

    // set new token
    res.cookie("refresh-token", newRefreshToken, options);

    return sendSuccess(res, 200, "Access token refeeshed", {
      user: {
        _id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
        isVarifiedSeller: existingUser.isVarifiedSeller,
      },
      accessToken: newAccessToken,
    });
  }
);

export {
  registerHandler,
  loginHandler,
  logoutHandler,
  refreshAccessTokenHAndler,
};
