import { FC, useEffect } from "react";
import useAuth from "../../hooks/useAuth.hook";
import { Link, Outlet } from "react-router-dom";
import { UserRole } from "../../apis/auth.api";
import ForbiddenPage from "../pages/errors/403.error";

const AuthSafe: FC = () => {
  const { isAuthenticated } = useAuth();
  useEffect(() => {}, [isAuthenticated]);
  if (isAuthenticated === false) {
    return <Link to={"/auth/login"}>Login</Link>;
  }
  return <Outlet />;
};
const AuthSafeWithRole: FC<{ role: UserRole }> = ({ role }) => {
  const { isAuthenticated, userCurrent } = useAuth();
  useEffect(() => {}, [isAuthenticated, userCurrent?.role]);
  if (isAuthenticated === false) {
    return <Link to={"/auth/login"}>Login</Link>;
  }
  if (userCurrent?.role !== role) {
    return <ForbiddenPage />;
  }
  return <Outlet />;
};

export { AuthSafe, AuthSafeWithRole };
