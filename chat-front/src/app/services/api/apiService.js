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
    if (token) {
      headers.set("authorization", `Token ${token}`);
      // headers.set("Content-Type", "application/json");
    }
    return headers;
  },
});

const baseAppQuery = async (args, api, extraOptions) => {
  console.log(args);

  let result = await baseQuery(args, api, extraOptions);

  return result;
};

export const appApi = createApi({
  reducerPath: "app_api",
  baseQuery: baseAppQuery,
  tagTypes: ["Profile"],

  endpoints: (build) => ({
    getUserDetails: build.query({
      query: () => ({
        url: "accounts/profile/",
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },

      providesTags: ["Profile"],
    }),
    updateUserDetails: build.mutation({
      query: (data) => ({
        url: "accounts/profile/",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["Profile"],
    }),
    getFile: build.query({
      query: (file_id) => ({
        url: `chat/download/${file_id}`,
        method: "GET",
      }),
    }),
    postFile: build.mutation({
      query: (file) => {
        return {
          url: `chat/upload/`,
          method: "POST",
          body: file,
          formData: true,
        };
      },
    }),
    findChats: build.query({
      query: (query_string) => ({
        url: `chat/find/${query_string}`,
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
export const {
  useGetUserDetailsQuery,
  usePostFileMutation,
  useGetFileQuery,
  useUpdateUserDetailsMutation,
  useFindChatsQuery,
} = appApi;
