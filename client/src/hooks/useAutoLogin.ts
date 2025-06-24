import { useEffect } from "react";
import { useLazyRefreshTokenQuery } from "../features/auth/authApi";
import { useAppDispatch } from "../store/hooks";
import { loginSuccess } from "../features/auth/authSlice";

export const useAutoLogin = () => {
  const [refreshToken] = useLazyRefreshTokenQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkSession = async (): Promise<void> => {
      try {
        const response = await refreshToken().unwrap();
        console.log("user");
        const { user, accessToken } = response.data;
        dispatch(loginSuccess({ user, accessToken }));
      } catch (error) {
        console.log("Auto-login failed", error);
      }
    };
    checkSession();
  }, [dispatch, refreshToken]);
};
