import { createSlice } from "@reduxjs/toolkit";

const myShop = JSON.parse(localStorage.getItem("my-shop"));
const myShopItems = JSON.parse(localStorage.getItem("my-shop-items"));

const initialState = {
  shop: myShop || null,
  items: myShopItems || [],
};

const ownerSlice = createSlice({
  name: "owner",
  initialState,
  reducers: {
    setShop: (state, action) => {
      state.shop = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setShop, setItems } = ownerSlice.actions;
export default ownerSlice.reducer;
