import React from "react";
import { useDashboardStore } from "hooks/useDashboardStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CashFlowChart: React.FC = () => {
  const { dashboard } = useDashboardStore();
  const { transactions } = dashboard;

  if (transactions.length === 0) {
    return (
      <div className="h-64 bg-gray-50 rounded flex items-center justify-center text-gray-400">
        No transactions yet
      </div>
    );
  }

  const chartData = transactions.map((t, i) => ({
    name: t.date ?? `#${i + 1}`,
    amount: t.type === "income" ? t.amount : -t.amount,
  }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#14b8a6"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CashFlowChart;
