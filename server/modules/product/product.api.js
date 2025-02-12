import express from "express";
import { productValidation } from "./product.validation.js";
import { productModel } from "./product.model.js";
import jwt from "jsonwebtoken";
import { userModel } from "../user/user.model.js";
import mongoose from "mongoose";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Product api is working" });
});

//----------create product--------
router.post(
  "/add",
  async (req, res, next) => {
    try {
      const authorization = req?.headers?.authorization;
      const token = authorization?.split(" ")[1];
      if (!token) throw new Error("No token found");
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findOne({ email: payload.email });
      if (!user) throw new Error("Unauthorized");
      const role = user.role;
      if (role !== "admin") throw new Error("Only admin can add products");
      next();
    } catch (error) {
      next(error);
    }
  },
  async (req, res, next) => {
    try {
      const data = req.body;
      const validateData = await productValidation.validate(data);
      const result = await productModel.create(validateData);
      res.json({ msg: "Product has been added successfully", data: result });
    } catch (error) {
      next(error);
    }
  }
);

//-------single product details--------
router.get(
  "/details/:id",
  (req, res, next) => {
    try {
      const id = req.params.id;
      const isValidId = mongoose.isValidObjectId(id);
      if (!isValidId) throw new Error("Invalid id");
      next();
    } catch (error) {
      next(error);
    }
  },
  async (req, res, next) => {
    try {
      const productId = req.params.id;
      if (!productId) throw new Error("ID not found");
      const product = await productModel.findById({ _id: productId });
      if (!product) throw new Error("Product not found");
      res.json({ msg: "success", data: product });
    } catch (error) {
      next(error);
    }
  }
);
//------list all the products--------
router.get("/allproducts", async (req, res, next) => {
  try {
    const allProducts = await productModel.find();
    res.json({ msg: "success", data: allProducts });
  } catch (error) {
    next(error);
  }
});

//-----edit single product-------
router.put(
  "/edit/:id",
  (req, res, next) => {
    try {
      const id = req.params.id;
      const isValidId = mongoose.isValidObjectId(id);
      if (!isValidId) throw new Error("Invalid id");
      next();
    } catch (error) {
      next(error);
    }
  },
  async (req, res, next) => {
    try {
      const authorization = req?.headers?.authorization;
      const token = authorization?.split(" ")[1];
      if (!token) throw new Error("Unauthorized");
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findOne({ email: payload.email });
      if (!user) throw new Error("Unauthorized");
      const role = user?.role;
      if (role === "user") throw new Error("Only admin can edit product");
      const data = req.body;
      const validateData = await productValidation.validate(data);
      const productId = req.params.id;
      if (!productId) throw new Error("Product not found");
      const updateProduct = await productModel.findByIdAndUpdate(
        productId,
        validateData,
        { new: true }
      );
      res.json({
        msg: "Product has been edited successfully",
        data: updateProduct,
      });
    } catch (error) {
      next(error);
    }
  }
);
//------delete single product------
router.delete(
  "/delete/:id",
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
      const authorization = req?.headers?.authorization;
      const token = authorization?.split(" ")[1];
      if (!token) throw new Error("Unauthorized");
      const payload = await jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findOne({ email: payload.email });
      if (!user) throw new Error("Unauthorized");
      const role = user?.role;
      if (role === "user") throw new Error("Only admin can delete products");
      console.log(user);
      const productId = req.params.id;
      if (!productId) throw new Error("Product not found");
      const deleteSingleProduct = await productModel.deleteOne({
        _id: productId,
      });
      res.json({
        msg: "Product has been deleted successfully",
        data: deleteSingleProduct,
      });
    } catch (error) {
      next(error);
    }
  }
);
//------delete all product------
router.delete("/alldelete", async (req, res, next) => {
  try {
    const authorization = req?.headers?.authorization;
    const token = authorization?.split(" ")[1];
    if (!token) throw new Error("Unauthorized");
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email: payload.email });
    if (!user) throw new Error("Unauthorized");
    const deleteAllProduct = await productModel.deleteMany();
    res.json({
      msg: "Product has been deleted successfully",
      data: deleteAllProduct,
    });
  } catch (error) {
    next(error);
  }
});
export default router;
