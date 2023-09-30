import { createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, user: user },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    logOut: (state) => {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("courses");
      state.token = null;
      state.user = null;
    },
  },
});

export const { loginSuccess, logOut } = authSlice.actions;
export default authSlice.reducer;
