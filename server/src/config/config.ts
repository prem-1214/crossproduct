import { config as conf } from "dotenv";

conf();

const _config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI as string,
  FRONTEND_URI: (process.env.FRONTEND_URI as string) || "http://localhost:5173",
  NODE_ENV: process.env.NODE_ENV as string,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY as string,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY as string,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
};

export const config = Object.freeze(_config);
