import React from "react";
import Sidebar from "components/layout/Sidebar";
import Topbar from "components/layout/Topbar";

const Reports: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50">
        <Topbar />
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Reports</h1>
          <p className="mt-4 text-gray-600">Reports placeholder — charts and export will be added in later PRs.</p>
        </div>
      </main>
    </div>
  );
};

export default Reports;
