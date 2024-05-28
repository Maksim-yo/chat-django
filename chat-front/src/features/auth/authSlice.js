import { createSlice } from "@reduxjs/toolkit";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
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
    setAuthError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export default authSlice.reducer;
export const { logout, setCredentials, setToken, setAuthError } =
  authSlice.actions;
