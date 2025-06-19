import express from "express";

import authRouter from "./api/auth/auth.routes";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import cookieParser from "cookie-parser";
import { config } from "./config/config";

const app = express();

app.use(
  cors({
    origin: config.FRONTEND_URI,
    credentials: true,
    exposedHeaders: ["Authorization"],
  }) 
);
app.use(express.json());
app.use(cookieParser());

// route configuration
app.use("/api/auth", authRouter);

app.use(errorHandler);
export { app };
