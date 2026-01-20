import cloudinary from "../../config/cloudinary/cloudinary.js";
import Shop from "../../models/shop/shop.model.js";
import fs from "fs";

export const creatShop = async (req, res) => {
  try {
    const { userId, role } = req.user;
    if (!userId || role !== "owner") {
      return res
        .status(400)
        .json({ success: false, message: "Unauthorized to create Shop" });
    }
    const { name, city, address } = req.body || {};

    let file = req.file;
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Image Required",
      });
    }

    if (!name || !city || !address) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }
    let shop = await Shop.findOne({ owner: userId });
    if (shop) {
      return res
        .status(400)
        .json({ success: false, message: "Already exist a shop", shop });
    }

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "Foodieo/shop",
    });

    fs.unlinkSync(file.path);

    shop = await Shop.create({
      name,
      city: city.toLowerCase(),
      address,
      owner: userId,
      image: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });

    return res
      .status(200)
      .json({ success: true, message: "Shop Created Successfully.", shop });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Failed to create Shop" });
    console.log(error);
  }
};

export const updateShop = async (req, res) => {
  try {
    const { userId, role } = req.user;

    const { shopId } = req.params;
    if (!userId || role !== "owner") {
      return res
        .status(400)
        .json({ success: false, message: "Unauthorized to update Shop" });
    }

    const { name, city, address } = req.body || {};
    const file = req.file;

    if (!name && !city && !address && !file) {
      return res
        .status(400)
        .json({ success: false, message: "At least one field is required." });
    }

    let shop = await Shop.findOne({ _id: shopId, owner: userId });
    if (!shop) {
      return res
        .status(400)
        .json({ success: false, message: "No Shop found!" });
    }

    if (file) {
      await cloudinary.uploader.destroy(shop?.image?.public_id);
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "Foodieo/shop",
      });
      shop.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    if (name) shop.name = name;
    if (city) shop.city = city.toLowerCase();
    if (address) shop.address = address;

    await shop.save();

    return res
      .status(200)
      .json({ success: true, message: "Shop Updated Successfully.", shop });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Failed to update Shop" });
  }
};

export const deleteShop = async (req, res) => {
  try {
    const { userId, role } = req.user;
    const { shopId } = req.params;
    if (!userId || role !== "owner") {
      return res
        .status(400)
        .json({ success: false, message: "Unauthorized to delete Shop" });
    }

    let shop = await Shop.findOneAndDelete({ _id: shopId, owner: userId });
    if (!shop) {
      return res
        .status(400)
        .json({ success: false, message: "No Shop found!" });
    }

    await cloudinary.uploader.destroy(shop?.image?.public_id);

    return res
      .status(200)
      .json({ success: true, message: "Shop Delete Successfully." });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Failed to Delete Shop" });
  }
};
