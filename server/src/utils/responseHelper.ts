import { Response } from "express";

export function sendSuccess(
  res: Response,
  statusCode = 200,
  message: string = "success",
  data?: unknown
): Response {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
}

export function sendError(
  res: Response,
  message: string,
  statusCode = 500
): Response {
  return res.status(statusCode).json({
    status: "error",
    message,
  });
}
