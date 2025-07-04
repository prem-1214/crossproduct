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

import ProductForm from "../components/products/ProductForm";
import MyProducts from "../pages/seller/MyProducts";

import ProductPreview from "../components/products/ProductPreview";
import Product from "../pages/user/Product";
import Cart from "@/components/products/Cart";
import CheckoutForm from "@/pages/order/CheckoutForm";
import MyOrdersPage from "@/pages/order/MyOrdersPage";
import OrderSummary from "@/pages/order/OrderSummaryPage";
import ManageOrders from "@/pages/seller/ManageOrders";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/products" element={<LandingPage />} /> */}
        <Route path="/product/:id" element={<ProductPreview />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" />
          <Route element={<RoleGuard allowedRoles={["user"]} />}>
            {/* <Route path="/user/profile" /> */}
            <Route path="/user/products" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart/checkout" element={<CheckoutForm />} />
            <Route path="/order/my-orders" element={<MyOrdersPage />} />
            <Route path="/order/my-orders/:id" element={<OrderSummary />} />
          </Route>
          <Route element={<RoleGuard allowedRoles={["seller"]} />}>
            {/* <Route path="/seller/profile" /> */}
            <Route path="/seller/dashboard" />
            <Route path="/seller/my-products" element={<MyProducts />} />
            <Route path="/seller/my-product/:id" element={<ProductPreview />} />
            <Route path="/seller/add-product" element={<ProductForm />} />
            <Route path="/seller/orders" element={<ManageOrders />} />
            <Route path="/seller/orders/:id" element={<ManageOrders />} />
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
