import type { ReactNode } from "react";
import Sidebar from "components/dashboard/layout/Sidebar";
import Topbar from "components/dashboard/layout/Topbar";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Topbar />
        <div className="flex-1 p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
