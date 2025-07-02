import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/AppError";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { Iuser, User } from "../models/users.models";
import { sendError } from "../utils/responseHelper";

export interface CustomRequest extends Request {
  user?: Iuser;
  token?: string;
}

export const authenticate = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies["refresh-token"];
    // req.headers?.authorization?.split(" ")[1];
    // console.log("header token>>>", req.headers);

    if (!token) throw new AppError("Unauthorized", 401);

    const decoded = jwt.verify(token, config.REFRESH_TOKEN_SECRET as string) as {
      _id: string;
    };

    if (!decoded) throw new AppError("Token invalid or expired", 403);

    const user = await User.findOne({
      _id: decoded._id,
    });
    if (!user) throw new AppError("authentication failed", 401);

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    next(error);
  }
};

export const checkRole =
  (...roles: Array<"user" | "seller" | "admin">) =>
  (req: CustomRequest, res: Response, next: NextFunction) => {
    const role = req?.user?.role;

    if (!role || !roles.includes(role)) {
      sendError(res, "Forbidden: Insufficient role", 403);
    }

    next();
  };
