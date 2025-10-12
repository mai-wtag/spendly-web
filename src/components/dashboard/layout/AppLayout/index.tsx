import { Outlet } from "react-router";
import Sidebar from "components/dashboard/layout/Sidebar";
import Topbar from "components/dashboard/layout/Topbar";

const AppLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Topbar />
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
