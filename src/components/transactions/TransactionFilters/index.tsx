import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { TRANSACTION_CATEGORIES } from "utils/constants/categories";
import type { TransactionType } from "utils/dashboardTypes";

interface TransactionFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedType: TransactionType | "all";
  onTypeChange: (type: TransactionType | "all") => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedCategory,
  onCategoryChange,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const allCategories = [
    ...TRANSACTION_CATEGORIES.income,
    ...TRANSACTION_CATEGORIES.expense,
  ];

  const handleReset = () => {
    onSearchChange("");
    onTypeChange("all");
    onCategoryChange("");
    setShowFilters(false);
  };

  const activeFiltersCount =
    (selectedType !== "all" ? 1 : 0) + (selectedCategory ? 1 : 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all"
            placeholder="Search transactions..."
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors relative"
        >
          <SlidersHorizontal size={18} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filters</span>
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal-400 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {showFilters && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800">Filters</h4>
            <button
              onClick={() => setShowFilters(false)}
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
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionFilters;
