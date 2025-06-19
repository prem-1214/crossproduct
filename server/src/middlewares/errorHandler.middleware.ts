import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { sendError } from "../utils/responseHelper";
import { ZodError } from "zod";

export function errorHandler(
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return sendError(res, error.message, error.statusCode);
  } else if (error instanceof ZodError) {
    const zodErrorMessage = error.errors?.map((err) => err.message).join(", ");
    return sendError(res, zodErrorMessage, 400);
  } else {
    return sendError(res, "Internal server error", 500);
  }
}
