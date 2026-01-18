import { createSlice } from "@reduxjs/toolkit";

const localUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: localUser || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
