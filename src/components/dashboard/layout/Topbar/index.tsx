import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Search, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import type { RootState, AppDispatch } from "reduxToolkit/store";
import { logout } from "reduxToolkit/auth/authSlice";
import { ROUTES } from "routes/paths";

const Topbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate(ROUTES.LOGIN);
    }, 500);
  };

  const displayName = user?.fullName || user?.email?.split("@")[0] || "User";

  return (
    <header className="flex h-16 md:h-20 items-center justify-between border-b border-gray-200 px-4 md:px-6 bg-white shadow-sm">
      <div className="text-base md:text-lg font-semibold text-gray-800 truncate">
        Welcome back, {displayName}!
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden md:flex items-center relative w-48 lg:w-64 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 gap-2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent text-sm focus:outline-none text-gray-700 placeholder:text-gray-400"
          />
        </div>

        <button
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Search"
        >
          <Search size={20} className="text-gray-600" />
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg px-3 md:px-4 py-2 bg-red-500 text-white text-xs md:text-sm font-medium hover:bg-red-600 transition-colors"
          aria-label="Logout"
        >
          <LogOut className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden sm:inline">Logout</span>
        </button>

        <div
          className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-teal-100 flex items-center justify-center border-2 border-teal-400 text-teal-600 font-semibold text-xs md:text-sm flex-shrink-0"
          aria-label="User profile"
          title={user?.email}
        >
          {displayName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
