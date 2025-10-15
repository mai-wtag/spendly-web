import { Target, TrendingUp } from "lucide-react";
import type { Goal } from "utils/dashboardTypes";

interface GoalCardProps {
  goal: Goal;
  onUpdate?: (id: string, amount: number) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onUpdate }) => {
  const progress = Math.round((goal.currentAmount / goal.targetAmount) * 100);
  const remaining = goal.targetAmount - goal.currentAmount;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getProgressColor = () => {
    if (progress >= 100) {
      return "bg-green-500";
    }
    if (progress >= 75) {
      return "bg-teal-500";
    }
    if (progress >= 50) {
      return "bg-blue-500";
    }
    if (progress >= 25) {
      return "bg-yellow-500";
    }

    return "bg-gray-400";
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-teal-50 rounded-lg">
            <Target size={20} className="text-teal-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">{goal.title}</h4>
            <p className="text-xs text-gray-500">{goal.category}</p>
          </div>
        </div>
        {progress >= 100 && (
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            Completed
          </span>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-semibold text-gray-800">{progress}%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full transition-all ${getProgressColor()}`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            ${goal.currentAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)}
          </span>
          {remaining > 0 && (
            <span className="text-gray-500">${remaining.toFixed(2)} left</span>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-500 pt-1">
          <TrendingUp size={12} />
          <span>Due: {formatDate(goal.deadline)}</span>
        </div>
      </div>

      {onUpdate && remaining > 0 && (
        <button
          onClick={() => onUpdate(goal.id, 50)}
          className="mt-3 w-full px-3 py-1.5 text-xs font-medium text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
        >
          Add $50
        </button>
      )}
    </div>
  );
};

export default GoalCard;
