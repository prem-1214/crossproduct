import mongoose from "mongoose";
import { config } from "../config/config";
import { DB_NAME } from "../constants";

export const connectDb = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected...")
    );
    mongoose.connection.on("error", (error) =>
      console.log("error in connecting to database...", error)
    );
    await mongoose.connect(`${config.MONGO_URI as string}/${DB_NAME}`);
  } catch (error) {
    console.log("error connecting db...", error);
    process.exit(1);
  }
};
