import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import LandingPage from "../pages/LandingPage";
import Layout from "../layouts/Layout";
import { useAutoLogin } from "../hooks/useAutoLogin";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import RoleGuard from "../components/auth/RoleGuard";
import AdminUsersPage from "../pages/admin/AdminUsersPage";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" />
          <Route element={<RoleGuard allowedRoles={["user"]} />}>
            <Route path="/products" />
            <Route path="/orders" />
            <Route path="/cart" />
          </Route>
          <Route element={<RoleGuard allowedRoles={["seller"]} />}>
            <Route path="/dashboard" />
            <Route path="/my-products" />
            <Route path="/add-products" />
            <Route path="/orders" />
          </Route>
          <Route element={<RoleGuard allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/products" />
            <Route path="/admin/orders" />
          </Route>
        </Route>
      </Route>
    </>
  )
);

export const AppRouter = () => {
  useAutoLogin();

  return <RouterProvider router={router} />;
};
