import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import type { AppDispatch } from "reduxToolkit/store";
import {
  selectStats,
  selectRecentTransactions,
  selectCashFlow,
  selectLoading,
} from "reduxToolkit/dashboard/dashboardSelectors";
import { deleteTransaction, loadTransactions } from "reduxToolkit/dashboard/dashboardThunks";

import PageHeader from "components/dashboard/common/PageHeader";
import Card from "components/dashboard/widgets/Card";
import StatCard from "components/dashboard/widgets/StatCard";
import QuickActions from "components/dashboard/widgets/QuickActions";
import CashFlowChart from "components/dashboard/widgets/CashFlowChart";
import TransactionList from "components/dashboard/widgets/TransactionList";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const stats = useSelector(selectStats);
  const recentTransactions = useSelector(selectRecentTransactions);
  const cashFlowData = useSelector(selectCashFlow);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(loadTransactions());
  }, [dispatch]);

  const handleDeleteTransaction = (id: string) => {
    dispatch(deleteTransaction(id));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Overview of your financial status" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Balance"
          value={stats.totalBalance}
          format="currency"
          icon={<Wallet size={24} />}
          loading={loading}
        />
        <StatCard
          title="Monthly Income"
          value={stats.monthlyIncome}
          format="currency"
          icon={<TrendingUp size={24} />}
          loading={loading}
        />
        <StatCard
          title="Monthly Expense"
          value={stats.monthlyExpense}
          format="currency"
          icon={<TrendingDown size={24} />}
          loading={loading}
        />
        <StatCard
          title="Monthly Savings"
          value={stats.monthlySavings}
          format="currency"
          icon={<PiggyBank size={24} />}
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card title="Cash Flow (Last 6 Months)" className="lg:col-span-2">
          <CashFlowChart data={cashFlowData} loading={loading} />
        </Card>

        <Card title="Quick Actions">
          <QuickActions />
        </Card>
      </div>

      <Card title="Recent Transactions">
        <TransactionList
          transactions={recentTransactions}
          onDelete={handleDeleteTransaction}
          loading={loading}
          maxItems={5}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
