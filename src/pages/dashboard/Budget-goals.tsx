import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import type { AppDispatch } from "reduxToolkit/store";
import {
  selectGoals,
  selectBudgets,
  selectLoading,
} from "reduxToolkit/dashboard/dashboardSelectors";
import { loadGoals, loadBudgets } from "reduxToolkit/dashboard/dashboardThunks";
import PageHeader from "components/dashboard/common/PageHeader";
import {
  AddGoalForm,
  GoalsList,
  AddBudgetForm,
  BudgetList,
} from "components/budgetGoals";

const BudgetGoals: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const goals = useSelector(selectGoals);
  const budgets = useSelector(selectBudgets);
  const loading = useSelector(selectLoading);

  const [showGoalForm, setShowGoalForm] = useState(false);
  const [showBudgetForm, setShowBudgetForm] = useState(false);

  useEffect(() => {
    dispatch(loadGoals());
    dispatch(loadBudgets());
  }, [dispatch]);

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <PageHeader
        title="Budget & Goals"
        description="Track your financial goals and budgets"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Goals</h2>
            <button
              onClick={() => setShowGoalForm(!showGoalForm)}
              className="flex items-center gap-2 px-4 py-2 bg-teal-400 text-white text-sm font-semibold rounded-lg hover:bg-teal-500 transition-colors"
            >
              <Plus size={18} />
              {showGoalForm ? "Cancel" : "Add Goal"}
            </button>
          </div>

          {showGoalForm && (
            <div className="mb-6">
              <AddGoalForm />
            </div>
          )}

          <GoalsList goals={goals} loading={loading} />
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Budget</h2>
            <button
              onClick={() => setShowBudgetForm(!showBudgetForm)}
              className="flex items-center gap-2 px-4 py-2 bg-teal-400 text-white text-sm font-semibold rounded-lg hover:bg-teal-500 transition-colors"
            >
              <Plus size={18} />
              {showBudgetForm ? "Cancel" : "Add Budget"}
            </button>
          </div>

          {showBudgetForm && (
            <div className="mb-6">
              <AddBudgetForm />
            </div>
          )}

          <BudgetList budgets={budgets} loading={loading} />
        </section>
      </div>
    </div>
  );
};

export default BudgetGoals;
