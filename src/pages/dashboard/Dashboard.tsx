import PageHeader from "components/dashboard/common/PageHeader";
import Card from "components/dashboard/widgets/Card";
import QuickActions from "components/dashboard/widgets/QuickActions";
import RecentTransactions from "components/dashboard/widgets/RecentTransactions";
import type { Transaction } from "components/dashboard/widgets/RecentTransactions";

const mockTransactions: Transaction[] = [
  { id: "1", description: "Salary Deposit", amount: 5000, type: "income", date: "Today" },
  { id: "2", description: "Grocery Shopping", amount: 120.50, type: "expense", date: "Yesterday" },
  { id: "3", description: "Freelance Project", amount: 800, type: "income", date: "2 days ago" },
];

const mockStats = [
  { title: "Total Balance", value: "$12,450.00" },
  { title: "Monthly Income", value: "$8,500.00" },
  { title: "Monthly Expense", value: "$3,200.00" },
  { title: "Monthly Savings", value: "$5,300.00" },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your financial status"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {mockStats.map((stat) => (
          <Card key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card title="Cash Flow" className="lg:col-span-2">
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <svg
                className="w-12 h-12 text-gray-400 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <p className="text-sm text-gray-500">Chart visualization coming soon</p>
            </div>
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
