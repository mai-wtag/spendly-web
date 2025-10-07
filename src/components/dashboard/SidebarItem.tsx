import React from "react";
import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  end?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label, end = false }) => {
  const linkClass = (isActive: boolean) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
      isActive ? "bg-teal-400 text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <NavLink end={end} to={to} className={({ isActive }) => linkClass(isActive)}>
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export default SidebarItem;
