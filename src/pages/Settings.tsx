import React from "react";
import Sidebar from "components/layout/Sidebar";
import Topbar from "components/layout/Topbar";

const Settings: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50">
        <Topbar />
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="mt-4 text-gray-600">User settings placeholder.</p>
        </div>
      </main>
    </div>
  );
};

export default Settings;
