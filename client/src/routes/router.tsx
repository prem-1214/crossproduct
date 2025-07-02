import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import LandingPage from "../pages/common/LandingPage";
import Layout from "../layouts/Layout";
import { useAutoLogin } from "../hooks/useAutoLogin";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import RoleGuard from "../components/auth/RoleGuard";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import Products from "../components/products/Products";

import ProductForm from "../components/products/ProductForm";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/products" element={<LandingPage />} /> */}
        <Route path="/products/:id" element={<Products />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" />
          <Route element={<RoleGuard allowedRoles={["user"]} />}>
            {/* <Route path="/user/profile" /> */}
            <Route path="/my-orders" />
            <Route path="/cart" />
          </Route>
          <Route element={<RoleGuard allowedRoles={["seller"]} />}>
            {/* <Route path="/seller/profile" /> */}
            <Route path="/seller/dashboard" />
            <Route path="/seller/my-products" />
            <Route path="/seller/add-product" element={<ProductForm />} />
            <Route path="/seller/orders" />
          </Route>
          <Route element={<RoleGuard allowedRoles={["admin"]} />}>
            {/* <Route path="/admin/profile" /> */}
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
