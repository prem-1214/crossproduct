import { Link, useNavigate } from "react-router-dom";
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
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        CrossProduct
      </Link>

      <div className="space-x-8">
        {!isAuthenticated ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">DashBoard</Link>
            {user?.role === "admin" && (
              <Link to="/admin-dashboard">Admin Dashboard</Link>
            )}
            <Button label="Logout" onClick={handleLogout} />
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
