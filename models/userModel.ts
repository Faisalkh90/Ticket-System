import mongoose from "mongoose";

// Create a schema for user model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // No two users can share the same email
      match: [
        // Regex to validate email
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email. Example: Faisal@gmail.com",
      ],
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create a model for user
export default mongoose.model("User", userSchema);
