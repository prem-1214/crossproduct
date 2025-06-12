import express, { Request, Response, NextFunction } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler.middleware";
import createHttpError from "http-errors";

const app = express();

app.get("/err", (req: Request, res: Response, next: NextFunction) => {
  //   const error = createHttpError(404, "not found");
  throw createHttpError(406, "not found");
});

app.use(globalErrorHandler);
export { app };
