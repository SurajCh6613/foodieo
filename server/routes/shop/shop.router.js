import express from "express";
import {
  creatShop,
  deleteShop,
  getMyShop,
  updateShop,
} from "../../controllers/shop/shop.controller.js";
import upload from "../../middlewares/multer/multer.js";

const shopRouter = express.Router();

shopRouter.post("/create", upload.single("image"), creatShop);
shopRouter.put("/update/:shopId", upload.single("image"), updateShop);
shopRouter.delete("/delete/:shopId", deleteShop);
shopRouter.get("/my-shop", getMyShop);

export default shopRouter;
