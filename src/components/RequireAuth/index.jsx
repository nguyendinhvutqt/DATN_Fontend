import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  // eslint-disable-next-line no-unused-vars

  const user = useSelector((state) => state.user);

  const location = useLocation();

  return user?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : user?.name ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

export default RequireAuth;
