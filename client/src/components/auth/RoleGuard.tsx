import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

interface RoleGuardProps {
  allowedRoles: Array<"user" | "seller" | "admin">;
}

function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated || !user) return <Navigate to={"/login"} replace />;
  if (!allowedRoles.includes(user.role))
    return <Navigate to={"/login"} replace />;

  return <Outlet />;
}

export default RoleGuard;
