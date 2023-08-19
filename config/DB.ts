import mongoose from "mongoose";

// Connect to DB and handle errors
async function connectDB() {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);
    console.log("Connect to DB successfully");
  } catch (error) {
    console.log("Connect to DB failed");
    console.log(error);
  }
}

export default connectDB;
