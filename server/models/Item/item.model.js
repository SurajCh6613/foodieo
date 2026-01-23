import mongoose from "mongoose";

const itemModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: [
        "Burger",
        "Pizza",
        "Sandwich",
        "Pasta",
        "Biryani",
        "Rolls",
        "Fries",
        "Momos",
        "Noodles",
        "Fried Rice",
        "Desserts",
        "Ice Cream",
        "Cake",
        "Juice",
        "Coffee",
        "Tea",
        "Snacks",
      ],
      required: true,
    },
    foodType: {
      type: String,
      enum: ["veg", "non-veg"],
      required: true,
    },
  },
  { timestamps: true },
);

const Item = mongoose.model("Item", itemModel);
export default Item;
