import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useHistory } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/";

export const authApi = createApi({
  reducerPath: "auth_api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    postLogin: build.mutation({
      query: (body) => ({
        url: "accounts/login/",
        method: "POST",
        body,
      }),
    }),

    postSignUp: build.mutation({
      query: (body) => ({
        url: "accounts/signup/",
        method: "POST",
        body,
      }),
    }),
  }),
});

const baseQuery = fetchBaseQuery({
  baseUrl,
  // mode: "no-cors",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userToken;
    console.log(token);
    if (token) {
      headers.set("authorization", `Token ${token}`);
      headers.set("Content-Type", "application/json");

      return headers;
    }
  },
});

const baseQueryWithRedirect = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  return result;
};

export const appApi = createApi({
  reducerPath: "app_api",
  baseQuery: baseQueryWithRedirect,

  endpoints: (build) => ({
    getUserDetails: build.query({
      query: () => ({
        url: "accounts/user/",
        method: "GET",
      }),
    }),
  }),
});

// export react hook
// export const { useGetUserQuery } = authApi;
export const { usePostLoginMutation, usePostSignUpMutation } = authApi;
export const { useGetUserDetailsQuery } = appApi;
