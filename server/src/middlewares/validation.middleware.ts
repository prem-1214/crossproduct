import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { sendError } from "../utils/responseHelper";

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (error) {
      if (error instanceof Error) {
        console.log("validation error: ", error.message);
      }
      sendError(res, "Invalid request data", 400);
    }
  };

export { validate };
