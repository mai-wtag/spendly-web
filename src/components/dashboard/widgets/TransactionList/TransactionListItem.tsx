import { ArrowDownCircle, ArrowUpCircle, Trash2 } from "lucide-react";
import { formatRelativeDate, formatCurrencyWithSign } from "utils/helpers";
import type { Transaction } from "utils/dashboardTypes";

interface TransactionListItemProps {
  transaction: Transaction;
  onDelete?: (id: string) => void;
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({
  transaction,
  onDelete,
}) => {
  return (
    <div className="group grid grid-cols-3 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors items-center">
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
        {formatRelativeDate(transaction.date)}
      </div>

      <div className="flex items-center justify-end gap-2">
        <span
          className={`text-sm font-semibold whitespace-nowrap ${
            transaction.type === "income" ? "text-green-600" : "text-red-600"
          }`}
        >
          {formatCurrencyWithSign(transaction.amount, transaction.type)}
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
  );
};

export default TransactionListItem;
