import mongoose from "mongoose";

// Create a schema for user model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      unique: true, // No two users can share the same email
      match: [
        // Regex to validate email
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
      min: 6,
      max: 255,
    },
    role: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
  },
  { timestamps: true }
);

// Create a model for user
export default mongoose.model("User", userSchema);
