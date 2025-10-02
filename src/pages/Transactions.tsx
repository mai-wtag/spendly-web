import React from "react";
import Sidebar from "components/layout/Sidebar";
import Topbar from "components/layout/Topbar";

const Transactions: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50">
        <Topbar />
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Transactions</h1>
          <p className="mt-4 text-gray-600">Placeholder page for Transactions. Implement CRUD in later PRs.</p>
        </div>
      </main>
    </div>
  );
};

export default Transactions;
