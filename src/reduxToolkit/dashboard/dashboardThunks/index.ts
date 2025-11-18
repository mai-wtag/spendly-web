import toast from "react-hot-toast";
import type { AppThunk } from "reduxToolkit/store";
import type { Transaction, AddBudgetPayload, Budget } from "utils/dashboardTypes";
import {
  addTransaction as addTransactionAction,
  updateTransaction as updateTransactionAction,
  addGoal as addGoalAction,
  deleteTransaction as deleteTransactionAction,
  deleteGoal as deleteGoalAction,
  updateGoalProgress as updateGoalProgressAction,
  addBudget as addBudgetAction,
  deleteBudget as deleteBudgetAction,
  setBudgets,
  setTransactions,
  setGoals,
  setLoading,
  setError,
} from "reduxToolkit/dashboard/dashboardSlice";
import type { AddTransactionPayload, AddGoalPayload } from "utils/dashboardTypes";
import {
  loadTransactionsFromStorage,
  loadGoalsFromStorage,
  saveTransactionsToStorage,
  saveGoalsToStorage,
} from "reduxToolkit/dashboard/helpers/localStorage";

export const loadTransactions = (): AppThunk => (dispatch) => {
  try {
    const transactions = loadTransactionsFromStorage();
    
    if (transactions) {
      dispatch(setTransactions(transactions));
    }
  } catch (error) {
    toast.error(
      `Failed to load transactions: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

export const loadGoals = (): AppThunk => (dispatch) => {
  try {
    const goals = loadGoalsFromStorage();

    if (goals) {
      dispatch(setGoals(goals));
    }
  } catch (error) {
    toast.error(
      `Failed to load goals: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

export const addTransaction =
  (payload: AddTransactionPayload): AppThunk =>
  (dispatch, getState) => {
    try {
      dispatch(setLoading(true));

      setTimeout(() => {
        dispatch(addTransactionAction(payload));

        const state = getState();
        saveTransactionsToStorage(state.dashboard.transactions);

        dispatch(setLoading(false));
        toast.success(
          `${payload.type === "income" ? "Income" : "Expense"} of $${payload.amount.toFixed(2)} added successfully!`
        );
      }, 300);
    } catch (error) {
      dispatch(setError("Failed to add transaction"));
      dispatch(setLoading(false));
      toast.error(
        `Failed to add transaction: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

export const deleteTransaction =
  (id: string): AppThunk =>
  (dispatch, getState) => {
    try {
      dispatch(deleteTransactionAction(id));

      const state = getState();
      saveTransactionsToStorage(state.dashboard.transactions);

      toast.success("Transaction deleted successfully!");
    } catch (error) {
      toast.error(
        `Failed to delete transaction: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

export const addGoal =
  (payload: AddGoalPayload): AppThunk =>
  (dispatch, getState) => {
    try {
      dispatch(setLoading(true));

      setTimeout(() => {
        dispatch(addGoalAction(payload));

        const state = getState();
        saveGoalsToStorage(state.dashboard.goals);

        dispatch(setLoading(false));
        toast.success(`Goal "${payload.title}" created successfully!`);
      }, 300);
    } catch (error) {
      dispatch(setError("Failed to add goal"));
      dispatch(setLoading(false));
      toast.error(
        `Failed to create goal: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

export const updateGoalProgress =
  (id: string, amount: number): AppThunk =>
  (dispatch, getState) => {
    try {
      dispatch(updateGoalProgressAction({ id, amount }));

      const state = getState();
      saveGoalsToStorage(state.dashboard.goals);

      toast.success(`Goal progress updated by $${amount.toFixed(2)}!`);
    } catch (error) {
      toast.error(
        `Failed to update goal progress: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

export const deleteGoal =
  (id: string): AppThunk =>
  (dispatch, getState) => {
    try {
      dispatch(deleteGoalAction(id));

      const state = getState();
      saveGoalsToStorage(state.dashboard.goals);

      toast.success("Goal deleted successfully!");
    } catch (error) {
      toast.error(
        `Failed to delete goal: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

export const updateTransaction =
  (transaction: Transaction): AppThunk =>
  (dispatch, getState) => {
    try {
      dispatch(updateTransactionAction(transaction));

      const state = getState();
      saveTransactionsToStorage(state.dashboard.transactions);

      toast.success("Transaction updated successfully!");
    } catch (error) {
      toast.error(
        `Failed to update transaction: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

const saveBudgetsToStorage = (budgets: Budget[]): void => {
  try {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  } catch (error) {
    toast.error(`Failed to save budgets: ${String(error)}`);
  }
};

const loadBudgetsFromStorage = (): Budget[] | null => {
  try {
    const stored = localStorage.getItem("budgets");

    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const loadBudgets = (): AppThunk => (dispatch) => {
  try {
    const budgets = loadBudgetsFromStorage();
    
    if (budgets) {
      dispatch(setBudgets(budgets));
    }
  } catch (error) {
    toast.error(`Failed to load budgets: ${String(error)}`);
  }
};

export const addBudget =
  (payload: AddBudgetPayload): AppThunk =>
  (dispatch, getState) => {
    try {
      dispatch(setLoading(true));

      setTimeout(() => {
        dispatch(addBudgetAction(payload));

        const state = getState();
        saveBudgetsToStorage(state.dashboard.budgets);

        dispatch(setLoading(false));
        toast.success(`Budget for "${payload.category}" created!`);
      }, 300);
    } catch (error) {
      dispatch(setError("Failed to add budget"));
      dispatch(setLoading(false));
      toast.error(`Failed to create budget: ${String(error)}`);
    }
  };

export const deleteBudget =
  (id: string): AppThunk =>
  (dispatch, getState) => {
    try {
      dispatch(deleteBudgetAction(id));

      const state = getState();
      saveBudgetsToStorage(state.dashboard.budgets);

      toast.success("Budget deleted!");
    } catch (error) {
      toast.error(`Failed to delete budget: ${String(error)}`);
    }
  };
