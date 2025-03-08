import express from "express";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  adminLoginValidation,
  adminRegistrationValidation,
} from "./admin.validation.js";
import { adminModel } from "./admin.model.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Admin api is working" });
});

//------register-------
router.post("/register", async (req, res, next) => {
  try {
    const data = req.body;
    const validateData = await adminRegistrationValidation.validate(data);
    const salt = await bcrypt.genSalt(10);
    validateData.password = await bcrypt.hash(validateData.password, salt);
    const existedUser = await adminModel.findOne({ email: validateData.email });
    if (existedUser) throw new Error("User exists try with another email");
    const result = await adminModel.create(validateData);
    res.json({ msg: "User is registered successfully", data: result });
  } catch (error) {
    next(error);
  }
});

//--------login--------
router.post("/login", async (req, res, next) => {
  try {
    const data = req.body;
    const validateData = await adminLoginValidation.validate(data);
    const user = await adminModel.findOne({ email: validateData.email });

    if (!user) throw new Error("User not found");
    const isPasswordMatch = await bcrypt.compare(
      validateData.password,
      user.password
    );
    if (!isPasswordMatch) throw new Error("Invalid credentials");
    const token = jwt.sign(
      { email: validateData.email },
      process.env.JWT_SECRET,
      { expiresIn: "2hr" }
    );
    res.json({ msg: "Login successfull", data: user, token });
  } catch (error) {
    next(error);
  }
});

export default router;
