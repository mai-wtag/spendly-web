import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import type { RootState, AppDispatch } from "reduxToolkit/store";
import { logout } from "reduxToolkit/auth/authSlice";
import { useLocalStorageStore } from "hooks/useLocalStorageStore";
import { ROUTES } from "routes/paths";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  
  const [loggedOut] = useLocalStorageStore<string | null>("loggedOut", null);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  };

  useEffect(() => {
    if (loggedOut === "true") {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [loggedOut, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Welcome, {user?.fullName || user?.email}!
        </h1>
        <p className="mb-6 text-gray-600">This is your dashboard. You're successfully logged in.</p>
        <button
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
