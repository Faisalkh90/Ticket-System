import mongoose from "mongoose";

// Connect to DB and validate
async function connectDB() {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);
    console.log("Connect to DB successfully");
  } catch (error) {
    console.log("Connect to DB failed");
  }
}

export default connectDB;
