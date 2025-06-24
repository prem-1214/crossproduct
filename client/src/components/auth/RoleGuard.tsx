import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

interface RoleGuardProps {
  allowedRoles: Array<"user" | "seller" | "admin">;
}

function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated || !user) return <NavLink to={"/login"} replace />;
  if (!allowedRoles.includes(user.role))
    return <Navigate to={"/unauthorized"} replace />;

  return <Outlet />;
}

export default RoleGuard;
