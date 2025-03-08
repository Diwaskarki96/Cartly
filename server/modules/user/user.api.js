import express from "express";
import { userModel } from "../user/user.model.js";
import {
  changePasswordValidation,
  editProfileValidation,
  loginValidation,
  registrationValidation,
} from "../user/user.validation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "User api is working" });
});

//------register-------
router.post("/register", async (req, res, next) => {
  try {
    const data = req.body;
    const validateData = await registrationValidation.validate(data);
    const salt = await bcrypt.genSalt(10);
    validateData.password = await bcrypt.hash(validateData.password, salt);
    const existedUser = await userModel.findOne({ email: validateData.email });
    if (existedUser) throw new Error("User exists try with another email");
    const result = await userModel.create(validateData);
    const token = jwt.sign(
      { email: validateData.email },
      process.env.JWT_SECRET,
      { expiresIn: "2hr" }
    );
    res.json({ msg: "User is registered successfully", data: result, token });
  } catch (error) {
    next(error);
  }
});

//--------login--------
router.post("/login", async (req, res, next) => {
  try {
    const data = req.body;
    const validateData = await loginValidation.validate(data);
    const user = await userModel.findOne({ email: validateData.email });

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
//-------user-details-------
router.post(
  "/user-detail/:id",

  async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const splittedValue = authorization?.split(" ");
      const token = splittedValue?.length === 2 ? splittedValue[1] : undefined;
      if (!token) throw new Error("Unauthorized");
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findOne({ email: payload.email });
      if (!user) throw new Error("User not found");
      if (user.role !== "user") throw new Error("Unauthorized");
      req.loggedInId = user?._id;
      next();
    } catch (e) {
      next(e);
    }
  },
  async (req, res, next) => {
    try {
      const user = await userModel.findOne({ _id: req.loggedInId });
      if (!user) throw new Error("User not found");
      res.json({ msg: "Success", data: user });
    } catch (e) {
      next(e);
    }
  }
);
//-------change user's first and lastname------
router.put(
  "/editProfile/:id",
  async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const splittedValue = authorization?.split(" ");
      const token = splittedValue?.length === 2 ? splittedValue[1] : undefined;
      if (!token) throw new Error("Unauthorized");
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findOne({ email: payload.email });
      if (!user) throw new Error("User not found");
      if (user.role !== "user") throw new Error("Unauthorized");
      req.loggedInId = user?._id;

      next();
    } catch (e) {
      next(e);
    }
  },
  async (req, res, next) => {
    try {
      const newData = req.body;
      const validateData = await editProfileValidation.validate(newData);
      const { firstName, lastName, profilePicture } = validateData;
      // const hashedPassword = await bcrypt.hash(
      //   password,
      //   +process.env.SALT_ROUND
      // );
      const user = await userModel.findOneAndUpdate(
        req.loggedInId,
        {
          firstName,
          lastName,
          profilePicture,
        },
        { new: true }
      );
      res.json({ message: "Profile updated successfully", user });
    } catch (e) {
      next(e);
    }
  }
);
//-------change user's password-------
router.put(
  "/changePassword/:id",

  async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const splittedValue = authorization?.split(" ");
      const token = splittedValue?.length === 2 ? splittedValue[1] : undefined;
      if (!token) throw new Error("Unauthorized");

      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findOne({ email: payload.email });
      if (!user) throw new Error("User not found");
      if (user.role !== "user") throw new Error("Unauthorized");

      req.loggedInId = user?._id;
      req.user = user; // Storing user data for next middleware

      next();
    } catch (e) {
      next(e);
    }
  },
  async (req, res, next) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const { user } = req; // Getting user from previous middleware

      await changePasswordValidation.validate({ oldPassword, newPassword });

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) throw new Error("Old password is incorrect");

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      res.json({ message: "Password is changed successfully", user });
    } catch (e) {
      next(e);
    }
  }
);
export default router;
