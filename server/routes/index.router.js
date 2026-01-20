import express from "express";
import authRouter from "./auth/auth.router.js";
import userRouter from "./user/user.router.js";
import shopRouter from "./shop/shop.router.js";
import { authUser } from "../middlewares/auth/authUser.js";
import itemRouter from "./item/item.router.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", authUser, userRouter);
router.use("/shop", authUser, shopRouter);
router.use("/item", authUser, itemRouter);

export default router;
