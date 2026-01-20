import cloudinary from "../../config/cloudinary/cloudinary.js";
import Item from "../../models/Item/item.model.js";
import Shop from "../../models/shop/shop.model.js";

export const addItem = async (req, res) => {
  try {
    const { name, price, category, foodType } = req.body || {};
    const file = req.file;
    const { userId, role } = req.user;
    if (!userId || role !== "owner") {
      return res
        .status(400)
        .json({ success: false, message: "Unauthorized to add item" });
    }

    if (!name || !price || !category || !foodType || !file) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    let shop = await Shop.findOne({ owner: userId });

    if (!shop) {
      return res
        .status(400)
        .json({ success: false, message: "Create shop first to add Item" });
    }

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "Foodieo/item",
    });

    const item = await Item.create({
      name,
      price,
      category,
      foodType,
      shop: shop?._id,
      image: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });

    shop.items.push(item?._id);
    await shop.save();

    return res
      .status(201)
      .json({ success: true, message: "Item added successfully", item });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Add Item failed" });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { name, price, category, foodType } = req.body || {};

    const file = req.file;

    const { userId, role } = req.user;

    const { itemId } = req.params;

    if (!itemId) {
      return res
        .status(400)
        .json({ success: false, message: "ItemId is required." });
    }

    if (!userId || role !== "owner") {
      return res
        .status(400)
        .json({ success: false, message: "Unauthorized to update item" });
    }

    if (!name && !price && !category && !foodType && !file) {
      return res
        .status(400)
        .json({ success: false, message: "At least one field is required." });
    }

    let item = await Item.findById(itemId);

    if (!item) {
      return res
        .status(201)
        .json({ success: false, message: "Item not found." });
    }

    if (file) {
      await cloudinary.uploader.destroy(item?.image?.public_id);
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "Foodieo/item",
      });
      item.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    if (name) item.name = name;
    if (category) item.category = category;
    if (price) item.price = price;
    if (foodType) item.foodType = foodType;

    return res
      .status(200)
      .json({ success: true, message: "Item Updated successfully.", item });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Update Item failed", error });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { userId, role } = req.user;
    const { itemId } = req.params;
    if (!userId || role !== "owner") {
      res
        .status(400)
        .json({ success: false, message: "Unauthorized to delete item" });
    }

    const item = await Item.findByIdAndDelete(itemId);

    if (!item) {
      return res
        .status(400)
        .json({ success: false, message: "Item not found." });
    }

    await cloudinary.uploader.destroy(item.image.public_id);

    return res
      .status(200)
      .json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Delete Item failed" });
  }
};

export const getItemsByCity = async (req, res) => {
  try {
    const { city } = req.params;

    const items = await Item.find().populate({
      path: "shop",
      match: { city: city.toLowerCase() },
    });

    const filteredItems = items.filter((item) => item.shop);

    return res.status(200).json({
      success: true,
      message: "Item fetch successfully",
      items: filteredItems,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Delete Item failed" });
  }
};

export const getItemsByShop = async (req, res) => {
  try {
    const { shopId } = req.params;
    if (!shopId) {
      return res
        .status(400)
        .json({ success: false, message: "ShopId is required." });
    }
    console.log(shopId);

    const items = await Item.find({ shop: shopId }).sort({ updatedAt: -1 });

    if (!items) {
      return res
        .status(400)
        .json({ success: true, message: "No Items found", items: [] });
    }

    return res.status(200).json({
      success: true,
      message: "Item fetch successfully",
      items,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Find Shop Items failed" });
  }
};
