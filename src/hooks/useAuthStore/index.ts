import { useLocalStorageStore } from "hooks/useLocalStorageStore";
import type { AuthState } from "reduxToolkit/auth/authSlice";

export const useAuthStore = () => {
  const [auth, setAuth, clearAuth] = useLocalStorageStore<AuthState>("auth", {
    user: null,
    isAuthenticated: false,
    loading: false,
    forgotEmail: null,
    isInitialized: false,
  });

  return { auth, setAuth, clearAuth };
};
