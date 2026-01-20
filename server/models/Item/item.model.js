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
        "North Indian",
        "South Indian",
        "Chinese",
        "Italian",
        "Mexican",
        "Street Food",
        "BBQ",
        "Seafood",
        "Salad",
        "Desserts",
        "Ice Cream",
        "Bakery",
        "Cake",
        "Beverages",
        "Juice",
        "Coffee",
        "Tea",
        "Milkshake",
        "Breakfast",
        "Healthy Food",
        "Vegan",
        "Jain Food",
        "Snacks",
        "Combos",
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
