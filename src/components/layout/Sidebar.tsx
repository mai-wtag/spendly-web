import { ChartBar, Goal, LayoutDashboard, Receipt, Settings } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "components/base-components/Logo";

const Sidebar: React.FC = () => {
  const linkClass = (isActive: boolean) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
      isActive ? "bg-teal-400 text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-100 p-6">
      <div className="flex items-center gap-3 mb-8">
        <Logo/>
        <h1 className="text-xl font-bold">Spendly</h1>
      </div>

      <nav className="flex flex-col gap-2">
        <NavLink end to="/dashboard" className={({ isActive }) => linkClass(isActive)}>
          <LayoutDashboard/>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/transactions" className={({ isActive }) => linkClass(isActive)}>
          <Receipt/>
          <span>Transactions</span>
        </NavLink>

        <NavLink to="/budget-goals" className={({ isActive }) => linkClass(isActive)}>
          <Goal/>
          <span>Budget & Goals</span>
        </NavLink>

        <NavLink to="/reports" className={({ isActive }) => linkClass(isActive)}>
          <ChartBar/>
          <span>Reports</span>
        </NavLink>

        <NavLink to="/settings" className={({ isActive }) => linkClass(isActive)}>
          <Settings/>
          <span>Settings</span>
        </NavLink>
      </nav>

    </aside>
  );
};

export default Sidebar;
