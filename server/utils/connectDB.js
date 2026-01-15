import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const result = await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected:",);
  } catch (error) {
    console.log("DB connection failed!");
  }
};
