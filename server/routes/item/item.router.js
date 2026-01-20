import express from "express";
import {
  addItem,
  deleteItem,
  getItemsByCity,
  updateItem,
} from "../../controllers/item/item.controller.js";
import upload from "../../middlewares/multer/multer.js";

const itemRouter = express.Router();

itemRouter.post("/add", upload.single("image"), addItem);
itemRouter.put("/update/:itemId", upload.single("image"), updateItem);
itemRouter.delete("/delete/:itemId", deleteItem);
itemRouter.get("/:city", getItemsByCity);

export default itemRouter;
