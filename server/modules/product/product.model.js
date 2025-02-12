import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minLength: 3, maxLength: 50 },
    description: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 1000,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "phones",
        "computer",
        "smartwatch",
        "camera",
        "headphones",
        "gaming",
      ],
    },
    price: { type: Number, required: true, min: 1 },
    quantity: { type: Number, required: true, min: 1 },
    color: {
      type: String,
      required: true,
      enum: ["Red", "Blue", "Green", "Black", "White", "Yellow"],
    },
    size: { type: String, required: false, enum: ["xs", "s", "m", "l", "xl"] },
    isStock: { type: Boolean, required: true, default: true },
    isFeatured: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);
export const productModel = mongoose.model("Products", productSchema);
