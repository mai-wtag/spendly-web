import { PlusCircle, MinusCircle } from "lucide-react";
import type { TransactionType } from "utils/dashboardTypes";

interface TransactionTypeToggleProps {
  type: TransactionType;
  onChange: (type: TransactionType) => void;
}

const TransactionTypeToggle: React.FC<TransactionTypeToggleProps> = ({
  type,
  onChange,
}) => {
  return (
    <div className="flex h-12 items-center justify-center rounded-xl bg-gray-100 p-1">
      <button
        type="button"
        onClick={() => onChange("income")}
        className={`flex-1 flex items-center justify-center h-full rounded-lg font-semibold transition-all duration-200 ${
          type === "income"
            ? "bg-green-500 text-white shadow-sm"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        <PlusCircle size={18} className="mr-2" />
        Income
      </button>
      <button
        type="button"
        onClick={() => onChange("expense")}
        className={`flex-1 flex items-center justify-center h-full rounded-lg font-semibold transition-all duration-200 ${
          type === "expense"
            ? "bg-red-500 text-white shadow-sm"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        <MinusCircle size={18} className="mr-2" />
        Expense
      </button>
    </div>
  );
};

export default TransactionTypeToggle;
