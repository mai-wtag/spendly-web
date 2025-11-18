import toast from "react-hot-toast";
import type { Transaction, Goal } from "utils/dashboardTypes";

export const loadTransactionsFromStorage = (): Transaction[] | null => {
  try {
    const stored = localStorage.getItem("transactions");

    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error(
      "Error loading transactions:",
      error instanceof Error ? error.message : String(error)
    );

    return null;
  }
};

export const loadGoalsFromStorage = (): Goal[] | null => {
  try {
    const stored = localStorage.getItem("goals");

    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error(
      "Error loading goals:",
      error instanceof Error ? error.message : String(error)
    );
    
    return null;
  }
};

export const saveTransactionsToStorage = (transactions: Transaction[]): void => {
  try {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  } catch (error) {
    toast.error(
      `Failed to save transactions: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

export const saveGoalsToStorage = (goals: Goal[]): void => {
  try {
    localStorage.setItem("goals", JSON.stringify(goals));
  } catch (error) {
    toast.error(
      `Failed to save goals: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};
