import { DollarSign } from "lucide-react";

const TransactionListEmpty: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <DollarSign className="text-gray-500" />
      </div>
      <p className="text-sm text-gray-500">No transactions yet</p>
      <p className="text-xs text-gray-400 mt-1">
        Add your first transaction to get started
      </p>
    </div>
  );
};

export default TransactionListEmpty;
