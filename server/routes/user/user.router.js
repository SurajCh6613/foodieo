import express, { Router } from "express";
import { getUserProfile } from "../../controllers/user/user.controller.js";
import { authUser } from "../../middlewares/auth/authUser.js";

const userRouter = express.Router();

userRouter.get("/me", authUser, getUserProfile);

export default userRouter;
