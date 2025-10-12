import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "reduxToolkit/store";
import { ROUTES } from "routes/paths";
import AppLayout from "components/dashboard/layout/AppLayout";

const PrivateRoute: React.FC = () => {
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

  return <AppLayout />;
};

export default PrivateRoute;
