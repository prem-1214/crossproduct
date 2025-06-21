import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import cookieParser from "cookie-parser";
import { config } from "./config/config";
import apiRouter from "./api/index";

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
app.use("/api/v1", apiRouter);


app.use(errorHandler);

export { app };
