import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const user = useSelector((state) => state.user);

  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  // Nếu có truyền allowedRoles thì kiểm tra role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Nếu truyền children (dùng như một wrapper), render children
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
