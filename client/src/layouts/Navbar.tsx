import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Button from "../components/UI/Button";
import { useLogoutMutation } from "../features/auth/authApi";
import { logout } from "../features/auth/authSlice";

function Navbar() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [logoutApi] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log("Logout Failed", error);
    }
  };

  return (
    <nav className="flex items-center justify-around m-5">
      <div className="text-2xl font-bold">
        <NavLink to={"/"}>Cross Product</NavLink>
      </div>
      <ul className="flex items-center gap-16">
        {!isAuthenticated && (
          <>
            <NavLink to={"/login"}>Login</NavLink>
            <NavLink to={"/register"}>Register</NavLink>
          </>
        )}

        {isAuthenticated &&
          user?.role === "user" &&
          !user?.isVarifiedSeller && (
            <>
              <NavLink to={"/products"}>Products</NavLink>
              <NavLink to={"/orders"}>Orders</NavLink>
              <NavLink to={"/cart"}>Cart</NavLink>
              <NavLink to={"/profile"}>Profile</NavLink>
              <Button
                label="Logout"
                type="submit"
                onClick={handleLogout}
                className={`bg-red-500 hover:bg-red-600 cursor-pointer rounded-3xl`}
              />
            </>
          )}

        {isAuthenticated &&
          user?.role === "seller" &&
          user.isVarifiedSeller === true && (
            <>
              <NavLink to={"/dashboard"}>Dashboard</NavLink>
              <NavLink to={"/my-products"}>My Products</NavLink>
              <NavLink to={"/add-products"}>Add Products</NavLink>
              <NavLink to={"/orders"}>Orders</NavLink>
              <NavLink to={"/profile"}>Profile</NavLink>
              <Button
                label="Logout"
                type="submit"
                onClick={handleLogout}
                className={`bg-red-500 hover:bg-red-600 cursor-pointer rounded-3xl`}
              />
            </>
          )}

        {isAuthenticated && user?.role === "admin" && (
          <>
            <NavLink to={"/admin/dashboard"}>Dashboard</NavLink>
            <NavLink to={"/admin/users"}>Manage Users</NavLink>
            <NavLink to={"/admin/products"}>All products</NavLink>
            <NavLink to={"/admin/orders"}>All Orders</NavLink>
            <Button
              label="Logout"
              type="submit"
              onClick={handleLogout}
              className={`bg-red-500 hover:bg-red-600 cursor-pointer rounded-3xl`}
            />
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
