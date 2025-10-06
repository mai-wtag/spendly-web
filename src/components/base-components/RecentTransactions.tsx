import React from "react";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
}

interface RecentTransactionsProps {
  transactions?: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions = [] }) => {
  return (
    <ul className="divide-y divide-gray-100">
      {transactions.length === 0 ? (
        <li className="py-2 text-sm text-gray-500">No transactions yet</li>
      ) : (
        transactions.map((t) => (
          <li key={t.id} className="py-2 flex justify-between text-sm">
            <span>{t.description}</span>
            <span
              className={`font-medium ${t.type === "income" ? "text-green-500" : "text-red-500"}`}
            >
              {t.type === "income" ? "+" : "-"}${t.amount}
            </span>
          </li>
        ))
      )}
    </ul>
  );
};

export default RecentTransactions;
