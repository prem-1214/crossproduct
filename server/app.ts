/// <reference path="./src/types/express/index.d.ts" />
import express from "express";
import cors from "cors";
import { errorHandler } from "./src//middlewares/errorHandler.middleware";
import cookieParser from "cookie-parser";
import { config } from "./src/config/config";
import apiRouter from "./src/api/index";

const app = express();

app.use(
  cors({
    origin: config.FRONTEND_URI,
    credentials: true,
    exposedHeaders: ["Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// route configuration
app.use("/api/v1", apiRouter);

app.use(errorHandler);

export { app };
