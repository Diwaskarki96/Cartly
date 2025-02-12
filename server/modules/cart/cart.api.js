import express from "express";
import { addToCartValidation } from "./cart.validation.js";
import jwt from "jsonwebtoken";
import { userModel } from "../user/user.model.js";
import mongoose from "mongoose";
import { productModel } from "../product/product.model.js";
import { cartModel } from "./cart.model.js";
const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    res.json({ msg: "Cart api is working" });
  } catch (error) {
    next(error);
  }
});
//------add to cart-------
router.post(
  "/add",
  async (req, res, next) => {
    try {
      const authorization = req?.headers?.authorization;
      const token = authorization?.split(" ")[1];
      if (!token) throw new Error("Unauthorized");
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findOne({ email: payload.email });
      if (!user) throw new Error("Unauthorized");
      const role = user?.role;
      if (role === "admin") throw new Error("Only user can add to cart");
      req.buyerId = user._id;
      next();
    } catch (error) {
      next(error);
    }
  },

  async (req, res, next) => {
    try {
      const data = req.body;
      const validateData = await addToCartValidation.validate(data);
      const isValidateId = mongoose.isValidObjectId(validateData.productId);
      if (!isValidateId) throw new Error("Invalid product id");
      const product = await productModel.findOne({
        _id: validateData.productId,
      });
      if (validateData.orderQuantity > product.quantity)
        throw new Error("Order quantity exceeded the available quantity");
      if (!product) throw new Error("Product not found");
      const addToCart = await cartModel.create({
        buyerId: req.buyerId,
        productId: validateData.productId,
        orderQuantity: validateData.orderQuantity,
      });
      res.json({ msg: "Cart has been added successfully", data: addToCart });
    } catch (error) {
      next(error);
    }
  }
);
//---------increase and decrease cart---------

export default router;
