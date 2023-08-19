import mongoose from "mongoose";
import { statEnum } from "../enums/statusEnum";
// Create a schema for ticket model
const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 3,
      max: 255,
    },
    description: {
      type: String,
      required: true,
      min: 3,
      max: 255,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(statEnum), // array of all values in statusEnum
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
