import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Button from "../components/UI/Button";
import { useLogoutMutation } from "../features/auth/authApi";
import { logout } from "../features/auth/authSlice";
import type { FC } from "react";

const Navbar: FC = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [logoutApi] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout Failed", error);
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive ? "text-lg text-red-400" : "text-gray-500";

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
              <NavLink to="/products" className={navLinkClass}>
                Products
              </NavLink>
              <NavLink to="/orders" className={navLinkClass}>
                Orders
              </NavLink>
              <NavLink to="/cart" className={navLinkClass}>
                Cart
              </NavLink>
              <NavLink to="/profile" className={navLinkClass}>
                Profile
              </NavLink>
              <Button
                label="Logout"
                type="submit"
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 cursor-pointer rounded-3xl"
              />
            </>
          )}

        {isAuthenticated &&
          user?.role === "seller" &&
          user?.isVarifiedSeller === true && (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/my-products" className={navLinkClass}>
                My Products
              </NavLink>
              <NavLink to="/add-products" className={navLinkClass}>
                Add Products
              </NavLink>
              <NavLink to="/orders" className={navLinkClass}>
                Orders
              </NavLink>
              <NavLink to="/profile" className={navLinkClass}>
                Profile
              </NavLink>
              <Button
                label="Logout"
                type="submit"
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
            <Button
              label="Logout"
              type="submit"
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
