import { useLocalStorageStore } from "./useLocalStorageStore";
import type { AuthState } from "slices/authSlice";

export const useAuthStore = () => {
  const [auth, setAuth, clearAuth] = useLocalStorageStore<AuthState>("auth", {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    forgotEmail: null,
    isInitialized: false,
  });

  return { auth, setAuth, clearAuth };
};
