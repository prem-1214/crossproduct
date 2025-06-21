import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { sendError } from "../utils/responseHelper";
import { ZodError } from "zod";

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (error instanceof AppError) {
     sendError(res, error.message, error.statusCode);
  } else if (error instanceof ZodError) {
    const zodErrorMessage = error.errors?.map((err) => err.message).join(", ");
     sendError(res, zodErrorMessage, 400);
  } else if (error instanceof Error) {
     sendError(res, error.message || "Internal server error", 500);
  } else {
     sendError(res, "Unknown error", 500);
  }
}
