import React from "react";
import { useDashboardStore } from "hooks/useDashboardStore";

const RecentTransactions: React.FC = () => {
  const { dashboard } = useDashboardStore();
  const { transactions } = dashboard;

  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {transactions.length === 0 ? (
        <div className="text-sm text-gray-500">No transactions yet</div>
      ) : (
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-2">Activity</th>
              <th className="text-left py-2 px-2">Date</th>
              <th className="text-right py-2 px-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b border-gray-100">
                <td className="py-2 px-2">{t.description}</td>
                <td className="py-2 px-2">{t.date ?? "-"}</td>
                <td
                  className={`py-2 px-2 font-medium text-right ${
                    t.type === "income" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}${t.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecentTransactions;
