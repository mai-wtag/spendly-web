import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "reduxToolkit/store";
import { ROUTES } from "routes/paths";
import type { ReactElement } from "react";

interface PrivateRouteProps {
  children: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, isInitialized } = useSelector((state: RootState) => state.auth);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-gray-600 text-lg">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
};

export default PrivateRoute;