import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "reduxToolkit/store";
import { ROUTES } from "routes/paths";
import AppLayout from "components/dashboard/layout/AppLayout";

const PrivateRoute: React.FC = () => {
  const { isAuthenticated, isInitialized } = useSelector((state: RootState) => state.auth);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <span className="text-gray-600 text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default PrivateRoute;
