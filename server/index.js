import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRouter from "./modules/user/user.api.js";
import adminRouter from "./modules/admin/admin.api.js";
import productRouter from "./modules/product/product.api.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cartRouter from "./modules/cart/cart.api.js";
import mongoose from "mongoose";
import cors from "cors";
const app = express();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL).then(() => {
  console.log("Database is connected...");
});

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.json({ msg: "Api is working" });
});
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
