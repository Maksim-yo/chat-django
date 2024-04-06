import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import chatReducer from "../features/chat/chatSlice";
import { authApi, appApi } from "./services/api/apiService";
import authSlice from "../features/auth/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    [authApi.reducerPath]: authApi.reducer,
    [appApi.reducerPath]: appApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(appApi.middleware),
});
setupListeners(store.dispatch);

export default store;
