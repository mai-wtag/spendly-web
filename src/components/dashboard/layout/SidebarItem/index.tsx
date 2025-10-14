import { NavLink } from "react-router";

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  end?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label, end = false }) => {
  return (
    <NavLink
      end={end}
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
          isActive
            ? "bg-teal-400 text-white shadow-sm"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export default SidebarItem;
