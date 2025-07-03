import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Button from "../components/UI/CustomButton";
import { useLogoutMutation } from "../features/auth/authApi";
import { logout } from "../features/auth/authSlice";
import type { FC } from "react";
import { ShoppingCart } from "lucide-react";

const Navbar: FC = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const cartItems = useAppSelector((state) => state.cart.items);
  const [logoutApi] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async (): Promise<void> => {
    try {
      await logoutApi().unwrap();
      console.log("log out................");
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout Failed", error);
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive ? "font-bold text-red-400" : "text-gray-500";

  return (
    <nav className="flex items-center justify-around m-5">
      <div className="text-2xl font-bold">
        <NavLink to="/">Cross Product</NavLink>
      </div>

      <ul className="flex items-center gap-16">
        {!isAuthenticated && (
          <>
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
            <NavLink to="/register" className={navLinkClass}>
              Register
            </NavLink>
          </>
        )}

        {isAuthenticated &&
          user?.role === "user" &&
          !user?.isVarifiedSeller && (
            <>
              <NavLink to="/order/my-orders" className={navLinkClass}>
                Orders
              </NavLink>
              <NavLink to="/cart" className={navLinkClass}>
                <div className="relative">
                  <ShoppingCart className="h-6 w-6 text-gray-600" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
              </NavLink>
              <NavLink to="/profile" className={navLinkClass}>
                Profile
              </NavLink>
              <Button
                label="Logout"
                type="button"
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 cursor-pointer rounded-3xl"
              />
            </>
          )}

        {isAuthenticated &&
          user?.role === "seller" &&
          user?.isVarifiedSeller === true && (
            <>
              <NavLink to="/seller/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/seller/my-products" className={navLinkClass}>
                My Products
              </NavLink>
              <NavLink to="/seller/add-product" className={navLinkClass}>
                Add Product
              </NavLink>
              <NavLink to="/orders" className={navLinkClass}>
                Orders
              </NavLink>
              <NavLink to="/profile" className={navLinkClass}>
                Profile
              </NavLink>
              <Button
                label="Logout"
                type="button"
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 cursor-pointer rounded-3xl"
              />
            </>
          )}

        {isAuthenticated && user?.role === "admin" && (
          <>
            <NavLink to="/admin/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/users" className={navLinkClass}>
              Manage Users
            </NavLink>
            <NavLink to="/admin/products" className={navLinkClass}>
              All Products
            </NavLink>
            <NavLink to="/admin/orders" className={navLinkClass}>
              All Orders
            </NavLink>
            <NavLink to="/profile" className={navLinkClass}>
              Profile
            </NavLink>
            <Button
              label="Logout"
              type="button"
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 cursor-pointer rounded-3xl"
            />
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
