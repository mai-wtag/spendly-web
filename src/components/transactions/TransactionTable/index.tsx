import { Edit2, Trash2 } from "lucide-react";
import type { Transaction } from "utils/dashboardTypes";

interface TransactionTableProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onEdit,
  onDelete,
  loading,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left">
          <thead className="sticky top-0 bg-gray-50 z-10">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-right">
                Amount
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Note
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="animate-pulse">
                <td className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </td>
                <td className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </td>
                <td className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-16 ml-auto"></div>
                </td>
                <td className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </td>
                <td className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-gray-400"
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
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No transactions yet</h3>
          <p className="text-sm text-gray-500">
            Add your first transaction to get started tracking your finances
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <table className="w-full text-left">
        <thead className="sticky top-0 bg-gray-50 z-10">
          <tr>
            <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Date
            </th>
            <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Category
            </th>
            <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-right">
              Amount
            </th>
            <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Note
            </th>
            <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="hover:bg-gray-50 transition-colors group"
            >
              <td className="p-4 whitespace-nowrap text-sm text-gray-700">
                {formatDate(transaction.date)}
              </td>
              <td className="p-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {transaction.category}
                </span>
              </td>
              <td className="p-4 whitespace-nowrap text-right">
                <span
                  className={`text-sm font-semibold ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}$
                  {Math.abs(transaction.amount).toFixed(2)}
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
