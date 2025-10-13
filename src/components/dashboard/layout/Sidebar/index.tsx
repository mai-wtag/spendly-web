import { ChartBar, Goal, LayoutDashboard, Receipt, Settings } from "lucide-react";
import Logo from "assets/Logo";
import SidebarItem from "components/dashboard/layout/SidebarItem";
import { ROUTES } from "routes/paths";

interface NavItem {
  to: string;
  icon: React.ReactNode;
  label: string;
  end?: boolean;
}

const navigationItems: NavItem[] = [
  {
    to: ROUTES.DASHBOARD,
    icon: <LayoutDashboard size={20} />,
    label: "Dashboard",
    end: true,
  },
  {
    to: ROUTES.TRANSACTIONS,
    icon: <Receipt size={20} />,
    label: "Transactions",
  },
  {
    to: ROUTES.BUDGET_GOALS,
    icon: <Goal size={20} />,
    label: "Budget & Goals",
  },
  {
    to: ROUTES.REPORTS,
    icon: <ChartBar size={20} />,
    label: "Reports",
  },
  {
    to: ROUTES.SETTINGS,
    icon: <Settings size={20} />,
    label: "Settings",
  },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-8">
        <Logo />
        <h1 className="text-xl font-bold text-gray-800">Spendly</h1>
      </div>

      <nav className="flex flex-col gap-2">
        {navigationItems.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            end={item.end}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
