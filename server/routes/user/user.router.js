import express from "express";
import {
  getUserProfile,
  updateUserProfile,
} from "../../controllers/user/user.controller.js";

const userRouter = express.Router();

userRouter.get("/me", getUserProfile);
userRouter.put("/update", updateUserProfile);

export default userRouter;
