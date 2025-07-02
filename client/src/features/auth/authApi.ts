import type { User } from "../user/user.types";
import type { LoginInput, RegisterInput } from "./authSchema";
import { api } from "../api";

interface AuthResponse {
  data: {
    user: User;
    accessToken: string;
  };
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginInput>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterInput>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
    refreshToken: builder.query<AuthResponse, void>({
      query: () => ({
        url: "/auth/refresh-token",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useLazyRefreshTokenQuery,
} = authApi;
