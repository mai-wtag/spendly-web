import { Edit2, Trash2 } from "lucide-react";
import { formatFullDate, formatCurrencyWithSign } from "utils/helpers";
import type { Transaction } from "utils/dashboardTypes";

interface TransactionTableRowProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionTableRow: React.FC<TransactionTableRowProps> = ({
  transaction,
  onEdit,
  onDelete,
}) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors group">
      <td className="p-4 whitespace-nowrap text-sm text-gray-700">
        {formatFullDate(transaction.date)}
      </td>

      <td className="p-4 whitespace-nowrap">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {transaction.category}
        </span>
      </td>

      <td className="p-4 whitespace-nowrap text-right">
        <span
          className={`text-sm font-semibold ${
            transaction.type === "income" ? "text-green-600" : "text-red-600"
          }`}
        >
          {formatCurrencyWithSign(transaction.amount, transaction.type)}
        </span>
      </td>

      <td className="p-4 max-w-xs truncate text-sm text-gray-600">
        {transaction.description}
      </td>

      <td className="p-4 whitespace-nowrap text-center">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onEdit(transaction)}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors opacity-0 group-hover:opacity-100"
            aria-label="Edit transaction"
          >
            <Edit2 size={16} className="text-gray-600" />
          </button>
          <button
            onClick={() => onDelete(transaction.id)}
            className="p-2 rounded-full hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
            aria-label="Delete transaction"
          >
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TransactionTableRow;
