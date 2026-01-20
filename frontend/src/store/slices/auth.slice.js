import { createSlice, current } from "@reduxjs/toolkit";

const localUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: localUser || null,
  currentCity: "Delhi",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
  },
});

export const { setUser, setCurrentCity } = authSlice.actions;
export default authSlice.reducer;
