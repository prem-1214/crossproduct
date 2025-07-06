import express, { Application } from "express";
import cors from "cors";
import { errorHandler } from "./src//middlewares/errorHandler.middleware";
import cookieParser from "cookie-parser";
import apiRouter from "./src/api/index";

const app: Application = express();

app.use(
  cors({
    origin: "http://localhost:5173",
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
