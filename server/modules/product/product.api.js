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
      // const authorization = req?.headers?.authorization;
      // const token = authorization?.split(" ")[1];
      // if (!token) throw new Error("No token found");
      // const payload = jwt.verify(token, process.env.JWT_SECRET);
      // const user = await userModel.findOne({ email: payload.email });
      // if (!user) throw new Error("Unauthorized");
      // const role = user.role;
      // if (role !== "admin") throw new Error("Only admin can add products");
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
    const { searchText } = req.query; // Use req.query for GET requests

    let filter = {};
    if (searchText) {
      filter.name = { $regex: searchText, $options: "i" }; // Case-insensitive search
    }
    const product = await productModel.aggregate([
      // { $match: match },

      {
        $project: {
          name: 1,
          brand: 1,
          price: 1,
          category: 1,
          freeShipping: 1,
          description: { $substr: ["$description", 0, 200] },
          availableQuantity: 1,
          image: 1,
        },
      },
    ]);
    const products = await productModel.find(filter).sort({ createdAt: -1 }); // Apply search filter
    res.json({ msg: "success", data: products });
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
//------featured products-----
router.get("/featured", async (req, res, next) => {
  try {
    const featruredProduct = await productModel.find({ isFeatured: true });
    res.json({ msg: "Featured Product", data: featruredProduct });
  } catch (error) {
    next(error);
  }
});
//TODO validation for category---------
//--------browse by category----------
router.get(
  "/category/:category",
  // async (req, res, next) => {
  //   try {
  //     // const authorization = req?.headers?.authorization;
  //     // const token = authorization?.split(" ")[1];
  //     // if (!token) throw new Error("Unauthorized");
  //     // const payload = jwt.verify(token, process.env.JWT_SECRET);
  //     // const user = await userModel.findOne({ email: payload.email });
  //     // if (!user) throw new Error("Unauthorized");
  //     // const role = user.role;
  //     // if (role !== "user")
  //     //   throw new Error("Only verified user can access this.");
  //     // next();
  //   } catch (error) {
  //     next(error);
  //   }
  // },
  async (req, res, next) => {
    try {
      const { category } = req.params;
      if (!category) throw new Error("Category not found");
      const productCategory = await productModel.find({ category });
      res.json({ result: "success", data: productCategory });
    } catch (error) {
      next(error);
    }
  }
);
//-----------only shows the category------
router.get("/category", async (req, res, next) => {
  try {
    const allCategory = await productModel.distinct("category");
    res.json({ msg: "Success", data: allCategory });
  } catch (error) {
    next(error);
  }
});
// Search API for products
router.get("/search", async (req, res, next) => {
  try {
    const { searchText } = req.query; // Extract search query from request

    let filter = {};
    if (searchText) {
      filter = {
        $or: [
          { name: { $regex: searchText, $options: "i" } }, // Case-insensitive search by name
          { brand: { $regex: searchText, $options: "i" } }, // Case-insensitive search by brand
          { category: { $regex: searchText, $options: "i" } }, // Case-insensitive search by category
        ],
      };
    }

    const products = await productModel.find(filter).sort({ createdAt: -1 }); // Fetch and sort products
    res.json({ msg: "success", data: products }); // Return success response
  } catch (error) {
    next(error); // Handle errors
  }
});
export default router;
