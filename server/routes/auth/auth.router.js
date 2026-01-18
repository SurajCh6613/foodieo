import express from "express";
import {
  userRegister,
  userLogin,
  verfyOtp,
  googleLogin,
} from "../../controllers/auth/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", userRegister);
authRouter.post("/login", userLogin);
authRouter.post("/verify-otp", verfyOtp);
authRouter.post("/googleLogin", googleLogin);

export default authRouter;
