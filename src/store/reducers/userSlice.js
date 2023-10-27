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
  },

  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.userId = action.payload.user.userId;
      state.name = action.payload.user.name;
      state.avatar = action.payload.user.avatar;
      state.roles = action.payload.user.roles;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userId = "";
      state.name = "";
      state.avatar = "";
      state.roles = [];
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
