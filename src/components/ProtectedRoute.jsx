import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute({ isAuthenticated, redirectTo = "/login" }) {
  const location = useLocation();

  if (isAuthenticated === false) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
