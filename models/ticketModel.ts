import mongoose from "mongoose";
import { statEnum } from "../enums/statusEnum";
// Create a schema for ticket model
const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(statEnum), // array of all values in statusEnum
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

// Create a model from ticket schema
export default mongoose.model("Ticket", ticketSchema);
