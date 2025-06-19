import { Response } from "express";

export function sendSuccess(
  res: Response,
  statusCode = 200,
  message: string = "success",
  data: unknown
) {
  res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
}

export function sendError(res: Response, message: string, statusCode = 500) {
  res.status(statusCode).json({
    status: "error",
    message,
  });
}
