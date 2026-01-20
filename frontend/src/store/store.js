import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice.js";
import ownerReducer from "./slices/owner.slice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    owner: ownerReducer,
  },
});
