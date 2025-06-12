import { config as conf } from "dotenv";

conf();

const _config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI as string,
};

export const config = Object.freeze(_config);
