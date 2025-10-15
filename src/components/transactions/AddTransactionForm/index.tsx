import { Plus } from "lucide-react";
import { TRANSACTION_CATEGORIES } from "utils/constants/categories";
import TransactionTypeToggle from "components/transactions/AddTransactionForm/TransactionTypeToggle";
import { useTransactionForm } from "components/transactions/AddTransactionForm/useTransactionForm";

const AddTransactionForm: React.FC = () => {
  const {
    type,
    setType,
    amount,
    setAmount,
    category,
    setCategory,
    date,
    setDate,
    description,
    setDescription,
    loading,
    handleSubmit,
  } = useTransactionForm();

  const categories = TRANSACTION_CATEGORIES[type];

  const handleTypeChange = (newType: typeof type) => {
    setType(newType);
    setCategory("");
  };

  return (
    <aside className="w-full lg:w-96 flex-shrink-0 bg-white rounded-xl shadow-sm p-6 flex flex-col gap-6 h-fit sticky top-6">
      <h3 className="text-2xl font-bold text-gray-800">Add Transaction</h3>

      <TransactionTypeToggle type={type} onChange={handleTypeChange} />

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
