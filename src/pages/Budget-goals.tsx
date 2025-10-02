import React from "react";
import Sidebar from "components/layout/Sidebar";
import Topbar from "components/layout/Topbar";

const Goals: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50">
        <Topbar />
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Budget & Goals</h1>
          <p className="mt-4 text-gray-600">Placeholder page for Goals. CRUD will be added later.</p>
        </div>
      </main>
    </div>
  );
};

export default Goals;
