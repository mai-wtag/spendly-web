import type { ReactNode } from "react";
import Sidebar from "components/dashboard/layout/Sidebar";
import Topbar from "components/dashboard/layout/Topbar";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
