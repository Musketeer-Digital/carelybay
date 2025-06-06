import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

export const connectDB = async () => {
  // Check if already connected
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve(true);
  }
  try {
    if (!MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined in environment variables.");
    }
    const { connection } = await mongoose.connect(MONGODB_URL);
    if (connection.readyState === 1) {
      console.log("MongoDB Connected Successfully!");
      return true;
    } else {
      console.log("MongoDB Connection Failed!");
      return false;
    }
    return connection;
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    return false;
  }
};
