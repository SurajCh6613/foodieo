import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setItems } = appSlice.actions;
export default appSlice.reducer;
