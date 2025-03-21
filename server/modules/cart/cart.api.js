import express from "express";
import {
  addToCartValidation,
  updateCartValidation,
} from "./cart.validation.js";
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
router.put(
  "/edit/:id",
  async (req, res, next) => {
    try {
      const authorization = req?.headers?.authorization;
      const token = authorization?.split(" ")[1];
      if (!token) throw new Error("Unauthorized");
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findOne({ email: payload.email });
      if (!user) throw new Error("Unauthorized");
      const role = user.role;
      if (role !== "user") throw new Error("Only user can edit cart");
      req.buyerId = user._id;
      next();
    } catch (error) {
      next(error);
    }
  },
  (req, res, next) => {
    try {
      const id = req.params.id;
      const isValidateId = mongoose.isValidObjectId(id);
      if (!isValidateId) throw new Error("Invalid id");
      next();
    } catch (error) {
      next(error);
    }
  },
  async (req, res, next) => {
    try {
      const actionData = req.body;
      const validateAction = await updateCartValidation.validate(actionData);
      const productId = req.params.id;
      const buyerId = req.buyerId;
      const cartItem = await cartModel.findOne({
        buyerId: buyerId,
        productId: productId,
      });
      console.log(cartItem);
      if (!cartItem) throw new Error("Cart does not exists.");
      const product = await productModel.findOne({ _id: productId });
      if (!product) throw new Error("Product not found.");
      const productAvailableQuantity = product?.quantity;
      let previousCartQuantity = cartItem.orderQuantity;
      let newOrderQuantity;
      if (validateAction.action === "inc") {
        newOrderQuantity = previousCartQuantity + 1;
      }
      if (validateAction.action === "dec") {
        newOrderQuantity = previousCartQuantity - 1;
      }
      if (newOrderQuantity > productAvailableQuantity)
        throw new Error("Product reached available quantity.");
      if (newOrderQuantity < 1)
        throw new Error("Ordered quantity cannot be Zero.");
      const updateCart = await cartModel.updateOne(
        { buyerId, productId },
        { orderQuantity: newOrderQuantity }
      );
      res.json({ msg: "Cart updated successfully", data: updateCart });
    } catch (error) {
      next(error);
    }
  }
);
//---------delete one cart by user---------
router.delete(
  "/delete/:id",
  async (req, res, next) => {
    try {
      const authorization = req?.headers?.authorization;
      const token = authorization?.split(" ")[1];
      if (!token) throw new Error("Unauthorized");
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findOne({ email: payload.email });
      if (!user) throw new Error("Unauthorized");
      req.buyerId = user._id;
      const role = user.role;
      if (role !== "user") throw new Error("Only user can edit cart");
      next();
    } catch (error) {
      next(error);
    }
  },
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const isValidateId = mongoose.isValidObjectId(id);
      if (!isValidateId) throw new Error("Invalid id");
      next();
    } catch (error) {
      next(error);
    }
  },
  async (req, res, next) => {
    try {
      const buyerId = req.buyerId;
      const productId = req.params.id;
      const product = await productModel.findOne({ _id: productId });
      if (!product) throw new Error("Product does not exists");
      const deleteCart = await cartModel.deleteOne({
        buyerId: buyerId,
        productId: productId,
      });
      res.json({ msg: "Cart has been deleted successfully", data: deleteCart });
    } catch (error) {
      next(error);
    }
  }
);
//--------delete all carts------
router.delete(
  "/clear",
  async (req, res, next) => {
    try {
      const authorization = req?.headers?.authorization;
      const token = authorization?.split(" ")[1];
      if (!token) throw new Error("Unauthorized");
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findOne({ email: payload.email });
      if (!user) throw new Error("Unauthorized");
      const role = user.role;
      req.buyerId = user._id;
      next();
    } catch (error) {
      next(error);
    }
  },
  async (req, res, next) => {
    try {
      const buyerId = req.buyerId;
      const deleteCart = await cartModel.deleteMany({ buyerId: buyerId });
      res.json({ msg: "Cart is deleted successfully", data: deleteCart });
    } catch (error) {
      next(error);
    }
  }
);
//---------list all the cart of a user---------
router.get(
  "/allcart",
  async (req, res, next) => {
    try {
      const authorization = req?.headers?.authorization;
      const token = authorization?.split(" ")[1];
      if (!token) throw new Error("Unauthorized");
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findOne({ email: payload.email });
      if (!user) throw new Error("Unauthorized");
      const role = user.role;
      if (role !== "user") throw new Error("Only user can clear all cart");
      req.buyerId = user._id;
      next();
    } catch (error) {
      next(error);
    }
  },
  async (req, res, next) => {
    try {
      const buyerId = req.buyerId;
      const cartItems = await cartModel.aggregate([
        {
          $match: { buyerId: buyerId },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        {
          $project: {
            name: { $first: "$productDetails.name" },
            unitPrice: { $first: "$productDetails.price" },
            catergory: { $first: "$productDetails.category" },
            image: { $first: "$productDetails.image" },
            orderQuantity: 1,
            productId: 1,
          },
        },
        {
          $project: {
            name: 1,
            unitPrice: 1,
            catergory: 1,
            image: 1,
            orderQuantity: 1,
            productId: 1,
            subTotal: { $multiply: ["$unitPrice", "$orderQuantity"] },
          },
        },
      ]);
      // let grandTotal = 0;
      // cartItems.forEach((cart) => {
      //   allProductSubTotal = allProductSubTotal + cart.subTotal;
      // });
      // grandTotal = allProductSubTotal;
      res.json({ msg: "Success", data: cartItems });
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/cartCount",
  async (req, res, next) => {
    try {
      const authorization = req?.headers?.authorization;
      const token = authorization?.split(" ")[1];
      if (!token) throw new Error("Unauthorized");
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findOne({ email: payload.email });
      if (!user) throw new Error("Unauthorized");
      const role = user.role;
      if (role !== "user") throw new Error("Only user ca access this");
      req.buyerId = user._id;
      next();
    } catch (error) {
      next(error);
    }
  },
  async (req, res, next) => {
    try {
      const loggedInUserId = req.buyerId;
      const cartCount = await cartModel
        .find({ buyerId: loggedInUserId })
        .countDocuments();
      return res.json({ msg: "success", data: cartCount });
    } catch (error) {
      next(error);
    }
  }
);
//TODO: cart item count, pagination, discount, total
export default router;
