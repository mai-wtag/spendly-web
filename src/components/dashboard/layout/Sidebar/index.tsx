import { useState } from "react";
import { ChartBar, Goal, LayoutDashboard, Receipt, Settings, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <aside
      className={`hidden md:block flex-shrink-0 bg-white border-r border-gray-200 p-6 transition-all duration-300 relative ${
        isMinimized ? "w-20" : "w-64"
      }`}
    >
      <div className={`flex items-center gap-3 mb-8 ${isMinimized ? "justify-center" : ""}`}>
        <Logo />
        {!isMinimized && <h1 className="text-xl font-bold text-gray-800">Spendly</h1>}
      </div>

      <nav className="flex flex-col gap-2">
        {navigationItems.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            end={item.end}
            isMinimized={isMinimized}
          />
        ))}
      </nav>

      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-8 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow text-gray-600 hover:text-teal-600"
        aria-label={isMinimized ? "Expand sidebar" : "Minimize sidebar"}
      >
        {isMinimized ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </aside>
  );
};

export default Sidebar;
