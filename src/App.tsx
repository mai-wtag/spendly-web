import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { Toaster } from "react-hot-toast";
import type { AppDispatch, RootState } from "reduxToolkit/store";
import { loadUser } from "reduxToolkit/auth/authSlice";
import { useLocalStorageStore } from "hooks/useLocalStorageStore";
import { ROUTES } from "routes/paths";
import RouteComponent from "routes";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isInitialized, isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [authStorage] = useLocalStorageStore<{ isAuthenticated: boolean; user: any } | null>("auth", null);
  const [loggedOut] = useLocalStorageStore<string | null>("loggedOut", null);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (isInitialized) {
      if (loggedOut === "true" && isAuthenticated) {
        dispatch(loadUser());
      } else if (authStorage) {
        dispatch(loadUser());
      }
    }
  }, [authStorage, loggedOut, isInitialized, isAuthenticated, dispatch]);

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      const authPages = [ROUTES.LOGIN, ROUTES.SIGNUP, ROUTES.FORGOT_PASSWORD, ROUTES.RESET_PASSWORD];
      if (authPages.includes(location.pathname)) {
        navigate(ROUTES.DASHBOARD, { replace: true });
      }
    }
  }, [isInitialized, isAuthenticated, location.pathname, navigate]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-gray-600 text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
          style: {
            background: '#fff',
            color: '#363636',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <RouteComponent />
    </>
  );
};

export default App;
