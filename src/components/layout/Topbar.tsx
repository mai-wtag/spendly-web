import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "slices/authSlice";
import { Search } from "lucide-react";

const Topbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      dispatch(logout());
    } catch {
      localStorage.removeItem("user");
    }
    navigate("/");
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 px-6 bg-white">
      <div className="text-lg font-semibold">Welcome back</div>

      <div className="flex items-center gap-4">
        <div className="flex relative w-64 rounded-full border border-gray-300 bg-gray-50 p-2 text-sm gap-4">
          <Search className="text-gray-400"/>
          <input
            type="text"
            placeholder="Search..."
            className="focus:outline-none focus:ring-1 focus:ring-teal-400"
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
