import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const databaseInit = (mongoUri?: string) => {
  const uri = mongoUri || process.env.DATABASE_MONGO_URL;

  try {
    mongoose.connect(uri as string, {});
    const connection = mongoose.connection;
    console.log("Database connection established");
    return connection;
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};
