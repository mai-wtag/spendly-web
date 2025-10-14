import { ArrowDownCircle, ArrowUpCircle, Trash2 } from "lucide-react";
import type { Transaction } from "utils/dashboardTypes";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete?: (id: string) => void;
  loading?: boolean;
  maxItems?: number;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDelete,
  loading = false,
  maxItems,
}) => {
  const displayTransactions = maxItems ? transactions.slice(0, maxItems) : transactions;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

    const diffDays = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse flex justify-between items-center py-3">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  if (displayTransactions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-sm text-gray-500">No transactions yet</p>
        <p className="text-xs text-gray-400 mt-1">Add your first transaction to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {displayTransactions.map((transaction) => (
        <div
          key={transaction.id}
          className="group flex justify-between items-center py-3 px-3 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <div className="flex items-center gap-3 flex-1">
            <div
              className={`flex-shrink-0 p-2 rounded-full ${
                transaction.type === "income" ? "bg-green-50" : "bg-red-50"
              }`}
            >
              {transaction.type === "income" ? (
                <ArrowUpCircle size={20} className="text-green-600" />
              ) : (
                <ArrowDownCircle size={20} className="text-red-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {transaction.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{transaction.category}</span>
                <span>•</span>
                <span>{formatDate(transaction.date)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`text-sm font-semibold whitespace-nowrap ${
                transaction.type === "income" ? "text-green-600" : "text-red-600"
              }`}
            >
              {transaction.type === "income" ? "+" : "-"}$
              {Math.abs(transaction.amount).toFixed(2)}
            </span>
            {onDelete && (
              <button
                onClick={() => onDelete(transaction.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-50 rounded text-red-600"
                aria-label="Delete transaction"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
