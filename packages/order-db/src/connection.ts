import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }
  if (process.env.MONGODB_URL === undefined) {
    throw new Error("MONGODB_URL is not defined in environment variables");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
