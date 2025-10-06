import { ChartBar, Goal, LayoutDashboard, Receipt, Settings } from "lucide-react";
import React from "react";
import Logo from "components/base-components/Logo";
import SidebarItem from "components/base-components/SidebarItem";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 flex-shrink-0 bg-gray-100 p-6">
      <div className="flex items-center gap-3 mb-8">
        <Logo />
        <h1 className="text-xl font-bold">Spendly</h1>
      </div>

      <nav className="flex flex-col gap-2">
        <SidebarItem to="/dashboard" icon={<LayoutDashboard />} label="Dashboard" end />
        <SidebarItem to="/transactions" icon={<Receipt />} label="Transactions" />
        <SidebarItem to="/budget-goals" icon={<Goal />} label="Budget & Goals" />
        <SidebarItem to="/reports" icon={<ChartBar />} label="Reports" />
        <SidebarItem to="/settings" icon={<Settings />} label="Settings" />
      </nav>
    </aside>
  );
};

export default Sidebar;
