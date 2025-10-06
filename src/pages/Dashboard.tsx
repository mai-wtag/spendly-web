import React from "react";
import Card from "components/base-components/Card";
import QuickActions from "components/base-components/QuickActions";
import RecentTransactions from "components/base-components/RecentTransactions";

const Dashboard: React.FC = () => {
  return (
        <div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card title="Total Balance" value={`$`} />
            <Card title="Monthly Income" value={`$`} />
            <Card title="Monthly Expense" value={`$`} />
            <Card title="Monthly Savings" value={`$`} />
          </div>


          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card title="Cash Flow" className="lg:col-span-2">
              <div className="h-64 bg-gray-50 rounded" aria-hidden />
            </Card>

            <Card title="Quick Actions">
              <QuickActions />
            </Card>
          </div>


          <Card title="Recent Transactions" className="mt-6">
            <RecentTransactions />
          </Card>
        </div>
  );
};

export default Dashboard;
