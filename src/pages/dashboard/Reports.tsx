import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch } from "reduxToolkit/store";
import { selectTransactions, selectLoading } from "reduxToolkit/dashboard/dashboardSelectors";
import { loadTransactions } from "reduxToolkit/dashboard/dashboardThunks";
import PageHeader from "components/dashboard/common/PageHeader";
import {
  DateRangeFilter,
  SpendingChart,
  CategoryBreakdown,
  ExportButton,
} from "components/reports";
import { getCategoryTotals } from "utils/helpers";

const Reports: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allTransactions = useSelector(selectTransactions);
  const loading = useSelector(selectLoading);

  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);

    return date.toISOString().split("T")[0];
  });

  const [filteredStartDate, setFilteredStartDate] = useState(startDate);
  const [filteredEndDate, setFilteredEndDate] = useState(endDate);

  useEffect(() => {
    dispatch(loadTransactions());
  }, [dispatch]);

  const filteredTransactions = useMemo(() => {
    return allTransactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const start = new Date(filteredStartDate);
      const end = new Date(filteredEndDate);

      return transactionDate >= start && transactionDate <= end;
    });
  }, [allTransactions, filteredStartDate, filteredEndDate]);

  const categoryData = useMemo(() => {
    return getCategoryTotals(filteredTransactions);
  }, [filteredTransactions]);

  const handleApplyFilter = () => {
    setFilteredStartDate(startDate);
    setFilteredEndDate(endDate);
  };

  const transactionCount = filteredTransactions.length;
  const expenseCount = filteredTransactions.filter(
    (t) => t.type === "expense"
  ).length;
  const incomeCount = filteredTransactions.filter(
    (t) => t.type === "income"
  ).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analysis"
        description="Analyze your spending patterns and export transaction data"
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onApplyFilter={handleApplyFilter}
        />

        <ExportButton
          transactions={filteredTransactions}
          startDate={filteredStartDate}
          endDate={filteredEndDate}
          disabled={transactionCount === 0}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
          <p className="text-2xl font-bold text-gray-800">
            {transactionCount}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-1">Income</p>
          <p className="text-2xl font-bold text-green-600">{incomeCount}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-1">Expenses</p>
          <p className="text-2xl font-bold text-red-600">{expenseCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SpendingChart data={categoryData} loading={loading} />
        </div>

        <div>
          <CategoryBreakdown data={categoryData} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Reports;
