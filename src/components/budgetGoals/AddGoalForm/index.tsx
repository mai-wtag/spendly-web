import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Target } from "lucide-react";
import toast from "react-hot-toast";
import type { AppDispatch } from "reduxToolkit/store";
import { addGoal } from "reduxToolkit/dashboard/dashboardThunks";
import { selectLoading } from "reduxToolkit/dashboard/dashboardSelectors";
import { GOAL_CATEGORIES } from "utils/constants/categories";

const AddGoalForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectLoading);

  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !targetAmount || !deadline || !category) {
      toast.error("Please fill all fields");

      return;
    }

    dispatch(
      addGoal({
        title: title.trim(),
        targetAmount: parseFloat(targetAmount),
        deadline,
        category,
      })
    );

    setTitle("");
    setTargetAmount("");
    setDeadline("");
    setCategory("");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-teal-50 rounded-lg">
          <Target size={20} className="text-teal-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Add New Goal</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Goal Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Save for Laptop"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              step="0.01"
              min="0"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="0.00"
              className="w-full pl-7 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
            required
          >
            <option value="">Select Category</option>
            {GOAL_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-teal-400 text-white font-semibold rounded-lg hover:bg-teal-500 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Adding...
            </>
          ) : (
            <>
              <Plus size={18} />
              Add Goal
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddGoalForm;
