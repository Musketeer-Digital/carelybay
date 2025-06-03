import mongoose from "mongoose";
const { MONGODB_URL } = process.env;

export const connectDB = async () => {
  // Check if already connected
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve(true);
  }
  try {
    const { connection } = await mongoose.connect(MONGODB_URL as string);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
    return connection;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
