import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../config/config";
import type { RootState } from "../store/store";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  tagTypes: ["Users", "Auth", "Products", "Orders"],
  endpoints: () => ({}),
});
