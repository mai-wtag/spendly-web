import { X } from "lucide-react";
import { TRANSACTION_CATEGORIES } from "utils/constants/categories";
import type { TransactionType } from "utils/dashboardTypes";

interface FilterPanelProps {
  selectedType: TransactionType | "all";
  onTypeChange: (type: TransactionType | "all") => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onReset: () => void;
  onClose: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedType,
  onTypeChange,
  selectedCategory,
  onCategoryChange,
  onReset,
  onClose,
}) => {
  const allCategories = [
    ...TRANSACTION_CATEGORIES.income,
    ...TRANSACTION_CATEGORIES.expense,
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-gray-800">Filters</h4>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 rounded transition-colors"
        >
          <X size={18} className="text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type
          </label>
          <select
            value={selectedType}
            onChange={(e) =>
              onTypeChange(e.target.value as TransactionType | "all")
            }
            className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all"
          >
            <option value="">All Categories</option>
            {allCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
