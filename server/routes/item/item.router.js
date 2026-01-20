import express from "express";
import {
  addItem,
  deleteItem,
  getItemsByCity,
  getItemsByShop,
  updateItem,
} from "../../controllers/item/item.controller.js";
import upload from "../../middlewares/multer/multer.js";

const itemRouter = express.Router();

itemRouter.post("/add", upload.single("image"), addItem);
itemRouter.put("/update/:itemId", upload.single("image"), updateItem);
itemRouter.delete("/delete/:itemId", deleteItem);
itemRouter.get("/by-city/:city", getItemsByCity);
itemRouter.get("/by-shop/:shopId", getItemsByShop);

export default itemRouter;
