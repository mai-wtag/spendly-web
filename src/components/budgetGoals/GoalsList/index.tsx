import { useDispatch } from "react-redux";
import { Trash2, Target, Calendar } from "lucide-react";
import type { AppDispatch } from "reduxToolkit/store";
import { deleteGoal } from "reduxToolkit/dashboard/dashboardThunks";
import { formatGoalDeadline } from "utils/helpers";
import type { Goal } from "utils/dashboardTypes";

interface GoalsListProps {
  goals: Goal[];
  loading?: boolean;
}

const GoalsList: React.FC<GoalsListProps> = ({ goals, loading }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this goal?")) {
      dispatch(deleteGoal(id));
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

  if (goals.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Target size={32} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">No goals yet</h3>
        <p className="text-sm text-gray-500">Create your first financial goal</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <div
          key={goal.id}
          className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200 group"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 bg-teal-50 rounded-lg flex-shrink-0">
                <Target size={20} className="text-teal-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-800 mb-1">{goal.title}</h4>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Target:</span> ${goal.targetAmount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Category:</span> {goal.category}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar size={12} />
                    <span>Due: {formatGoalDeadline(goal.deadline)}</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleDelete(goal.id)}
              className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 rounded transition-all flex-shrink-0"
              aria-label="Delete goal"
            >
              <Trash2 size={16} className="text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GoalsList;
