import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  username?: string;
  email: string;
  role: "user" | "seller" | "admin";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
}

let parsedUser: User | null = null;
const savedUser = localStorage.getItem("user");
if (savedUser && savedUser !== "undefined") {
  try {
    parsedUser = JSON.parse(savedUser);
  } catch {
    parsedUser = null;
  }
}

const initialState: AuthState = {
  user: parsedUser,
  isAuthenticated: !!parsedUser,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; accessToken: string }>
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    registerSuccess: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, registerSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
