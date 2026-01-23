import { createSlice } from "@reduxjs/toolkit";
import { getFromStorage } from "../../../helper/localeStorage";

const saved=getFromStorage("cartItems")

const initialState = {
  cartItems: saved || {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      state.cartItems[item?._id] = { ...item, qty: 1 };
    },

    increaseQty: (state, action) => {
      const _id = action.payload;
      state.cartItems[_id].qty += 1;
    },

    decreaseQty: (state, action) => {
      const _id = action.payload;
      state.cartItems[_id].qty -= 1;

      if (state.cartItems[_id].qty === 0) {
        delete state.cartItems[_id];
      }
    },
  },
});

export const { addToCart, increaseQty, decreaseQty } = cartSlice.actions;
export default cartSlice.reducer;
