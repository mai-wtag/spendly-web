import { useDispatch } from "react-redux";
import { Trash2, Wallet } from "lucide-react";
import type { AppDispatch } from "reduxToolkit/store";
import { deleteBudget } from "reduxToolkit/dashboard/dashboardThunks";
import type { Budget } from "utils/dashboardTypes";

interface BudgetListProps {
  budgets: Budget[];
  loading?: boolean;
}

const BudgetList: React.FC<BudgetListProps> = ({ budgets, loading }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this budget?")) {
      dispatch(deleteBudget(id));
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg p-4 animate-pulse border border-gray-200">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (budgets.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wallet size={32} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">No budgets yet</h3>
        <p className="text-sm text-gray-500">Create your first budget to track spending</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {budgets.map((budget) => (
        <div
          key={budget.id}
          className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200 group"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 bg-teal-50 rounded-lg flex-shrink-0">
                <Wallet size={20} className="text-teal-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-800 mb-1">{budget.category}</h4>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Monthly Limit:</span> ${budget.limit.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Track your {budget.category.toLowerCase()} expenses
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleDelete(budget.id)}
              className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 rounded transition-all flex-shrink-0"
              aria-label="Delete budget"
            >
              <Trash2 size={16} className="text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BudgetList;
