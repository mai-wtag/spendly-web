import { NavLink } from "react-router";

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  end?: boolean;
  isMinimized?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label, end = false, isMinimized = false }) => {
  return (
    <NavLink
      end={end}
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all relative group ${
          isActive
            ? "bg-teal-400 text-white shadow-sm"
            : "text-gray-700 hover:bg-gray-100"
        } ${isMinimized ? "justify-center" : ""}`
      }
      title={isMinimized ? label : undefined}
    >
      <span className="flex-shrink-0">{icon}</span>
      {!isMinimized && <span>{label}</span>}
      
      {isMinimized && (
        <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
          {label}
        </span>
      )}
    </NavLink>
  );
};

export default SidebarItem;
