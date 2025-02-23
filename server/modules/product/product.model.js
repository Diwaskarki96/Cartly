import mongoose from "mongoose";
// import productImage from "/client/public/images/acer.jpg";
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
      type: [String],
      required: true,
      enum: ["red", "blue", "green", "black", "white", "yellow"],
    },
    size: { type: String, required: false, enum: ["xs", "s", "m", "l", "xl"] },
    freeShipping: { type: Boolean, default: false },
    isStock: { type: Boolean, required: true, default: true },
    isFeatured: { type: Boolean, required: true, default: true },
    productImage: {
      type: String,
      required: true,
      default:
        "https://imgs.search.brave.com/yeOvOjjaYfOU4TUMqxEPho3FhjeZkfUxVHBkCcAQt-g/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9ianMu/c2NlbmU3LmNvbS9p/cy9pbWFnZS9ianMv/MzMyNjExPyRianMt/SW5pdGlhbDYwMCQ.jpeg",
    },
  },
  { timestamps: true }
);
export const productModel = mongoose.model("Products", productSchema);
