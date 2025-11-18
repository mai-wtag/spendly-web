import { ArrowDownCircle, ArrowUpCircle, DollarSign, Trash2 } from "lucide-react";
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

    if (date.toDateString() === today.toDateString()) {
       return "Today";
    }

    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric",
      year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined 
    });
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse grid grid-cols-3 gap-4 py-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (displayTransactions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <DollarSign className="text-gray-500"/>
        </div>
        <p className="text-sm text-gray-500">No transactions yet</p>
        <p className="text-xs text-gray-400 mt-1">Add your first transaction to get started</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 px-4 py-3 bg-gray-50 rounded-t-lg border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider justify-between">  
          <span>Activity</span>  
          <span>Date</span>  
          <span>Amount</span>  
      </div>  

      <div className="divide-y divide-gray-100">
        {displayTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="group grid grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors items-center"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`flex-shrink-0 p-1.5 rounded-full ${
                  transaction.type === "income" ? "bg-green-50" : "bg-red-50"
                }`}
              >
                {transaction.type === "income" ? (
                  <ArrowUpCircle size={16} className="text-green-600" />
                ) : (
                  <ArrowDownCircle size={16} className="text-red-600" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {transaction.description}
                </p>
                <p className="text-xs text-gray-500 truncate">{transaction.category}</p>
              </div>
            </div>

            <div className="text-sm text-gray-600 text-center">
              {formatDate(transaction.date)}
            </div>

            <div className="flex items-center justify-end gap-2">
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
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-50 rounded text-red-600 flex-shrink-0"
                  aria-label="Delete transaction"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
