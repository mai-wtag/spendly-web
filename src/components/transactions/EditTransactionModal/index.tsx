import { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import type { AppDispatch } from "reduxToolkit/store";
import { updateTransaction } from "reduxToolkit/dashboard/dashboardThunks";
import { selectLoading } from "reduxToolkit/dashboard/dashboardSelectors";
import { TRANSACTION_CATEGORIES } from "utils/constants/categories";
import type { Transaction } from "utils/dashboardTypes";

interface EditTransactionModalProps {
  transaction: Transaction;
  onClose: () => void;
}

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({
  transaction,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectLoading);

  const [amount, setAmount] = useState(transaction.amount.toString());
  const [category, setCategory] = useState(transaction.category);
  const [date, setDate] = useState(transaction.date);
  const [description, setDescription] = useState(transaction.description);

  const categories = TRANSACTION_CATEGORIES[transaction.type];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!category) {
      toast.error("Please select a category");
      return;
    }

    if (!description.trim()) {
      toast.error("Please add a description");
      return;
    }

    dispatch(
      updateTransaction({
        ...transaction,
        amount: parseFloat(amount),
        category,
        date,
        description: description.trim(),
      })
    );

    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Edit Transaction</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                transaction.type === "income"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {transaction.type === "income" ? "Income" : "Expense"}
            </span>
          </div>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700 mb-2">Amount</span>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                $
              </span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-7 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all"
                required
              />
            </div>
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700 mb-2">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all"
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700 mb-2">Date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all"
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700 mb-2">Note</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-24 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all resize-none"
              required
            />
          </label>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-teal-400 text-white font-semibold hover:bg-teal-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionModal;
