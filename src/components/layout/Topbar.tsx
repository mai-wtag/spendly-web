import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "slices/authSlice";
import { Search } from "lucide-react";
import { useLocalStorageStore } from "hooks/useLocalStorageStore";
import type { AuthState } from "slices/authSlice";

const Topbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [auth, setAuth, clearAuth] = useLocalStorageStore<AuthState>("auth", {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    forgotEmail: null,
    isInitialized: false,
  });


  useEffect(() => {
    if (!auth.user) {
      const usersStr = localStorage.getItem("users");
      if (usersStr) {
        try {
          const users = JSON.parse(usersStr);
          if (Array.isArray(users) && users.length > 0) {
            const storedUser = users[users.length - 1];
            setAuth((prev) => ({
              ...prev,
              user: storedUser,
              isAuthenticated: true,
              isInitialized: true,
            }));
          }
        } catch (err) {
          console.error("Failed to parse users:", err);
        }
      }
    }
  }, [auth.user, setAuth]);


  const handleLogout = () => {
    try {
      dispatch(logoutAction());
      clearAuth();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      localStorage.removeItem("auth");
    }
  };

  const userName = auth?.user?.fullName || "User";

  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 px-6 bg-white">
      <div className="text-xl font-semibold">Welcome back, {userName}</div>

      <div className="flex items-center gap-4">

        <div className="flex relative w-64 rounded-full border border-gray-300 bg-gray-50 p-2 text-sm gap-4">
          <Search className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="focus:outline-none focus:ring-1 focus:ring-teal-400 w-full bg-transparent"
          />
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg px-4 py-2 bg-red-400 text-white text-sm hover:bg-red-500"
        >
          Logout
        </button>

        <div
          className="h-10 w-10 rounded-full bg-cover bg-center"
          style={{ backgroundImage: `url("https://i.pravatar.cc/40")` }}
          aria-hidden
        />
      </div>
    </header>
  );
};

export default Topbar;
