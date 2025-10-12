import { Card, QuickActions, RecentTransactions } from "components/dashboard";
import type { Transaction } from "components/dashboard";

const mockTransactions: Transaction[] = [
  { id: "1", description: "Salary Deposit", amount: 5000, type: "income", date: "Today" },
  { id: "2", description: "Grocery Shopping", amount: 120.50, type: "expense", date: "Yesterday" },
  { id: "3", description: "Freelance Project", amount: 800, type: "income", date: "2 days ago" },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card title="Total Balance" value="$12,450.00" />
        <Card title="Monthly Income" value="$8,500.00" />
        <Card title="Monthly Expense" value="$3,200.00" />
        <Card title="Monthly Savings" value="$5,300.00" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card title="Cash Flow" className="lg:col-span-2">
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <p className="text-sm text-gray-500">Chart will be added in later PRs</p>
          </div>
        </Card>

        <Card title="Quick Actions">
          <QuickActions />
        </Card>
      </div>

      <Card title="Recent Transactions">
        <RecentTransactions transactions={mockTransactions} />
      </Card>
    </div>
  );
};

export default Dashboard;
