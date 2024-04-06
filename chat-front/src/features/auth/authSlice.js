import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin, getUserInfo } from "./authAction";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken: userToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
    logout: (state) => {
      console.log("logout");
      localStorage.removeItem("userToken");
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
    setToken: (state, { payload }) => {
      state.userToken = payload;
    },
  },
});

export default authSlice.reducer;
export const { logout, setCredentials, setToken } = authSlice.actions;
