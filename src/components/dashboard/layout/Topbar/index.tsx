import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Search, LogOut } from "lucide-react";
import type { RootState, AppDispatch } from "reduxToolkit/store";
import { logout } from "reduxToolkit/auth/authSlice";
import { ROUTES } from "routes/paths";

const Topbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 px-6 bg-white shadow-sm">
      <div className="text-lg font-semibold text-gray-800">
        Welcome back, {user?.fullName || user?.email}!
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center relative w-64 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 gap-2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent text-sm focus:outline-none"
          />
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg px-4 py-2 bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
          aria-label="Logout"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>

        <div
          className="h-10 w-10 rounded-full bg-cover bg-center border-2 border-gray-200"
          style={{ backgroundImage: `url("https://i.pravatar.cc/40")` }}
          aria-label="User profile"
        />
      </div>
    </header>
  );
};

export default Topbar;
