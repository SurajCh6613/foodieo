import { createSlice, current } from "@reduxjs/toolkit";
import { getFromStorage} from "../../helper/localeStorage";

const localUser = getFromStorage("user");

const initialState = {
  user: localUser || null,
  currentCity: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
  },
});

export const { setUser, setCurrentCity } = authSlice.actions;
export default authSlice.reducer;
