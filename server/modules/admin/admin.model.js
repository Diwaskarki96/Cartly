import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      default: "admin",
    },
  },
  { timestamps: true }
);
export const adminModel = mongoose.model("admin", adminSchema);
