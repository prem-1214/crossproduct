import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import LandingPage from "../pages/LandingPage";
import Layout from "../layouts/Layout";
import { useAutoLogin } from "../hooks/useAutoLogin";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </>
  )
);

export const AppRouter = () => {
  useAutoLogin();

  return <RouterProvider router={router} />;
};
