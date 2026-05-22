import mongoose from "mongoose";

export const connectDatabase = async mongoUri => {
  if (!mongoUri) {
    console.warn("MONGO_URI is not set. HiveCore will run with in-memory sample data only.");
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
  } catch (error) {
    console.warn(`MongoDB connection failed: ${error.message}`);
    console.warn("HiveCore will continue with in-memory sample data.");
  }
};
