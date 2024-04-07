import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
const baseUrl = "http://127.0.0.1:8000/";

export const authApi = createApi({
  reducerPath: "auth_api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      headers.set("X-CSRFToken", Cookies.get("csrftoken"));
      return headers;
    },
  }),
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

    postLogout: build.mutation({
      queryFn: async (_, { getState }) => {
        const token = getState().auth.userToken;
        const response = await fetch(`${baseUrl}accounts/logout/`, {
          method: "POST",
          headers: token ? { Authorization: `Token ${token}` } : {},
        });

        if (!response.ok) {
          return {
            error: {
              status: response.status,
              data: {
                message: response?.statusText,
              },
            },
          };
        }

        return await { data: response.json() };
      },
    }),
  }),
});

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userToken;
    console.log(token);
    if (token) {
      headers.set("authorization", `Token ${token}`);
      headers.set("Content-Type", "application/json");
    }
    return headers;
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

export const {
  usePostLoginMutation,
  usePostSignUpMutation,
  usePostLogoutMutation,
} = authApi;
export const { useGetUserDetailsQuery } = appApi;
