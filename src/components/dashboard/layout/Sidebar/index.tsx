import { ChartBar, Goal, LayoutDashboard, Receipt, Settings } from "lucide-react";
import Logo from "assets/Logo";
import SidebarItem from "components/dashboard/layout/SidebarItem";
import { ROUTES } from "routes/paths";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-8">
        <Logo />
        <h1 className="text-xl font-bold text-gray-800">Spendly</h1>
      </div>

      <nav className="flex flex-col gap-2">
        <SidebarItem 
          to={ROUTES.DASHBOARD} 
          icon={<LayoutDashboard size={20} />} 
          label="Dashboard" 
          end 
        />
        <SidebarItem 
          to={ROUTES.TRANSACTIONS} 
          icon={<Receipt size={20} />} 
          label="Transactions" 
        />
        <SidebarItem 
          to={ROUTES.BUDGET_GOALS} 
          icon={<Goal size={20} />} 
          label="Budget & Goals" 
        />
        <SidebarItem 
          to={ROUTES.REPORTS} 
          icon={<ChartBar size={20} />} 
          label="Reports" 
        />
        <SidebarItem 
          to={ROUTES.SETTINGS} 
          icon={<Settings size={20} />} 
          label="Settings" 
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
