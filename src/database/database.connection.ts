import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const databaseInit = () => {
  try {
    mongoose.connect(process?.env?.DATABASE_MONGO_URL as string, {});
    const connection = mongoose.connection;
    console.log("database connection established");
    return connection;
  } catch (error) {
    console.log(error);
  }
};
