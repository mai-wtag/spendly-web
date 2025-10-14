import toast from "react-hot-toast";
import type { AppThunk } from "reduxToolkit/store";
import {
  addTransaction as addTransactionAction,
  addGoal as addGoalAction,
  deleteTransaction as deleteTransactionAction,
  deleteGoal as deleteGoalAction,
  updateGoalProgress as updateGoalProgressAction,
  setTransactions,
  setGoals,
  setLoading,
  setError,
} from "reduxToolkit/dashboard/dashboardSlice";
import type { AddTransactionPayload, AddGoalPayload, Transaction, Goal } from "utils/types/dashboard.types";

export const loadTransactions = (): AppThunk => (dispatch) => {
  try {
    const stored = localStorage.getItem("transactions");
    if (stored) {
      const transactions: Transaction[] = JSON.parse(stored);
      dispatch(setTransactions(transactions));
    }
  } catch (error) {
    console.error("Failed to load transactions:", error);
  }
};

export const loadGoals = (): AppThunk => (dispatch) => {
  try {
    const stored = localStorage.getItem("goals");
    if (stored) {
      const goals: Goal[] = JSON.parse(stored);
      dispatch(setGoals(goals));
    }
  } catch (error) {
    console.error("Failed to load goals:", error);
  }
};

const saveTransactionsToStorage = (transactions: Transaction[]) => {
  try {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  } catch (error) {
    console.error("Failed to save transactions:", error);
  }
};

const saveGoalsToStorage = (goals: Goal[]) => {
  try {
    localStorage.setItem("goals", JSON.stringify(goals));
  } catch (error) {
    console.error("Failed to save goals:", error);
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
      toast.error("Failed to add transaction");
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
      toast.error("Failed to delete transaction");
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
      toast.error("Failed to create goal");
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
      toast.error("Failed to update goal progress");
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
      toast.error("Failed to delete goal");
    }
  };
