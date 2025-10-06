import React, { useState, useEffect } from "react";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  date?: string;
}

interface RecentTransactionsProps {
  initialTransactions?: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  initialTransactions = [],
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  useEffect(() => {
    
  }, []);

  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
      {transactions.length === 0 ? (
        <div className="text-sm text-gray-500">No transactions yet</div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {transactions.map((t) => (
            <li key={t.id} className="py-2 flex justify-between text-sm">
              <span>{t.description}</span>
              <span
                className={`font-medium ${
                  t.type === "income" ? "text-green-500" : "text-red-500"
                }`}
              >
                {t.type === "income" ? "+" : "-"}${t.amount}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentTransactions;
