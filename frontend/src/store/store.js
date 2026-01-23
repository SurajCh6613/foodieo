import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice.js";
import ownerReducer from "./slices/owner.slice.js";
import appReducer from "./slices/app.slice.js";
import cartReducer from "./slices/user/cart.slice.js";
import { setToStorage } from "../helper/localeStorage.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    owner: ownerReducer,
    app: appReducer,
    cart: cartReducer,
  },
});

store.subscribe(() => {
  setToStorage("cartItems", store.getState().cart.cartItems);
  setToStorage("user", store.getState().auth.user);
  setToStorage("my-shop", store.getState().owner.shop);
  setToStorage("my-shop-items", store.getState().owner.items);
});
