// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    isLoggedIn: false,
    userId: "",
    name: "",
    avatar: "",
    roles: [],
    accessToken: "",
    refreshToken: "",
  },

  reducers: {
    login(state, action) {
      console.log("action: ", action);
      state.isLoggedIn = true;
      state.userId = action.payload.user.userId;
      state.name = action.payload.user.name;
      state.avatar = action.payload.user.avatar;
      state.roles = action.payload.user.roles;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userId = "";
      state.name = "";
      state.avatar = "";
      state.roles = [];
      state.accessToken = "";
      state.refreshToken = "";
    },
    rfToken(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const { login, logout, rfToken } = userSlice.actions;

export default userSlice.reducer;
