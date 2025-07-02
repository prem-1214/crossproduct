import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { config } from "../config/config";
import type { RootState } from "../store/store";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  tagTypes: ["Users", "Auth", "Product", "Orders"],
  endpoints: () => ({}),
});
