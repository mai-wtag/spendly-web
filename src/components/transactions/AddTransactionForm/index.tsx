import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircle, MinusCircle, Plus } from "lucide-react";
import toast from "react-hot-toast";
import type { AppDispatch } from "reduxToolkit/store";
import { addTransaction } from "reduxToolkit/dashboard/dashboardThunks";
import { selectLoading } from "reduxToolkit/dashboard/dashboardSelectors";
import { TRANSACTION_CATEGORIES } from "utils/constants/categories";
import type { TransactionType } from "utils/dashboardTypes";

const AddTransactionForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectLoading);

  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");

  const categories = TRANSACTION_CATEGORIES[type];

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
      addTransaction({
        description: description.trim(),
        amount: parseFloat(amount),
        type,
        category,
      })
    );

    setAmount("");
    setCategory("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <aside className="w-full lg:w-96 flex-shrink-0 bg-white rounded-xl shadow-sm p-6 flex flex-col gap-6 h-fit sticky top-6">
      <h3 className="text-2xl font-bold text-gray-800">Add Transaction</h3>

      <div className="flex h-12 items-center justify-center rounded-xl bg-gray-100 p-1">
        <button
          type="button"
          onClick={() => {
            setType("income");
            setCategory("");
          }}
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
          onClick={() => {
            setType("expense");
            setCategory("");
          }}
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="flex flex-col">
          <span className="text-sm font-medium text-gray-600 mb-2">Amount</span>
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
              className="w-full pl-7 pr-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all"
              placeholder="0.00"
              required
            />
          </div>
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium text-gray-600 mb-2">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium text-gray-600 mb-2">Date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all"
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium text-gray-600 mb-2">Note</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-24 px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all resize-none"
            placeholder="Add a note"
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-lg h-12 bg-teal-400 text-white font-bold hover:bg-teal-500 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Adding...
            </>
          ) : (
            <>
              <Plus size={20} />
              Add Transaction
            </>
          )}
        </button>
      </form>
    </aside>
  );
};

export default AddTransactionForm;
