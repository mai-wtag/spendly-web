import React from "react";
import Sidebar from "components/layout/Sidebar";
import Topbar from "components/layout/Topbar";


const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-gray-50">
        <Topbar />

        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Total Balance</p>
              <p className="text-2xl font-bold mt-2">$—</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Monthly Income</p>
              <p className="text-2xl font-bold mt-2">$—</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Monthly Expense</p>
              <p className="text-2xl font-bold mt-2">$—</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Monthly Savings</p>
              <p className="text-2xl font-bold mt-2">$—</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
              <h3 className="text-lg font-semibold mb-3">Cash Flow</h3>
              <div className="h-64 bg-gray-50 rounded" aria-hidden />
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
              <div className="flex flex-col gap-3">
                <button className="rounded bg-teal-400 px-4 py-2 text-white">Add Transaction</button>
                <button className="rounded bg-gray-100 px-4 py-2">Set Goal</button>
                <button className="rounded bg-gray-100 px-4 py-2">View Reports</button>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
            <div className="text-sm text-gray-500">Transaction list will appear here</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
