import React from "react";
import DashboardLayout from "components/dashboard/DashboardLayout";
import SummaryCards from "components/dashboard/SummaryCards";
import CashFlowChart from "components/dashboard/CashFlowChart";
import QuickActions from "components/dashboard/QuickActions";
import RecentTransactions from "components/dashboard/RecentTransactions";
import Card from "components/dashboard/Card";

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <SummaryCards />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card title="Cash Flow" className="lg:col-span-2">
          <CashFlowChart />
        </Card>
        <Card title="Quick Actions">
          <QuickActions />
        </Card>
      </div>

      <Card title="Recent Transactions" className="mt-6">
        <RecentTransactions />
      </Card>
    </DashboardLayout>
  );
};

export default Dashboard;
