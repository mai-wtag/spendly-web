import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "reduxToolkit/store";
import type { Transaction, Goal, FinancialStats, CashFlowData } from "utils/dashboardTypes";

export const selectDashboard = (state: RootState) => state.dashboard;

export const selectTransactions = (state: RootState): Transaction[] => 
  state.dashboard.transactions;

export const selectGoals = (state: RootState): Goal[] => 
  state.dashboard.goals;

export const selectStats = (state: RootState): FinancialStats => 
  state.dashboard.stats;

export const selectCashFlow = (state: RootState): CashFlowData[] => 
  state.dashboard.cashFlow;

export const selectLoading = (state: RootState): boolean => 
  state.dashboard.loading;

export const selectError = (state: RootState): string | null => 
  state.dashboard.error;

export const selectRecentTransactions = createSelector(
  [selectTransactions],
  (transactions): Transaction[] => transactions.slice(0, 5)
);

export const selectActiveGoals = createSelector(
  [selectGoals],
  (goals): Goal[] => goals.filter((goal) => goal.currentAmount < goal.targetAmount)
);

export const selectCompletedGoals = createSelector(
  [selectGoals],
  (goals): Goal[] => goals.filter((goal) => goal.currentAmount >= goal.targetAmount)
);

export const selectTotalIncome = createSelector(
  [selectStats],
  (stats): number => stats.monthlyIncome
);

export const selectTotalExpense = createSelector(
  [selectStats],
  (stats): number => stats.monthlyExpense
);

export const selectSavingsRate = createSelector(
  [selectStats],
  (stats): number => {
    if (stats.monthlyIncome === 0) {
      return 0;
    }

    return (stats.monthlySavings / stats.monthlyIncome) * 100;
  }
);

export const selectBudgets = (state: RootState) => state.dashboard.budgets;
