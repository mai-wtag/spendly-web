export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  date?: string;
}

interface RecentTransactionsProps {
  transactions?: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions = [] }) => {
  return (
    <div className="space-y-3">
      {transactions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">No transactions yet</p>
          <p className="text-xs text-gray-400 mt-1">
            Add your first transaction to get started
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className="py-3 flex justify-between items-center hover:bg-gray-50 px-2 rounded transition-colors"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-800">
                  {transaction.description}
                </span>
                {transaction.date && (
                  <span className="text-xs text-gray-500">{transaction.date}</span>
                )}
              </div>
              <span
                className={`text-sm font-semibold ${
                  transaction.type === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentTransactions;
