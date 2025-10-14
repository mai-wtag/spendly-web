import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "reduxToolkit/store";

export const selectDashboardState = (state: RootState) => state.dashboard;

export const selectStats = (state: RootState) => state.dashboard.stats;

export const selectTransactions = (state: RootState) => state.dashboard.transactions;

export const selectGoals = (state: RootState) => state.dashboard.goals;

export const selectCashFlow = (state: RootState) => state.dashboard.cashFlow;

export const selectLoading = (state: RootState) => state.dashboard.loading;

export const selectError = (state: RootState) => state.dashboard.error;

export const selectRecentTransactions = createSelector(
  [selectTransactions],
  (transactions) => transactions.slice(0, 5)
);

export const selectIncomeTransactions = createSelector(
  [selectTransactions],
  (transactions) => transactions.filter((t) => t.type === "income")
);

export const selectExpenseTransactions = createSelector(
  [selectTransactions],
  (transactions) => transactions.filter((t) => t.type === "expense")
);

export const selectTotalIncome = createSelector(
  [selectIncomeTransactions],
  (transactions) => transactions.reduce((sum, t) => sum + t.amount, 0)
);

export const selectTotalExpense = createSelector(
  [selectExpenseTransactions],
  (transactions) => transactions.reduce((sum, t) => sum + t.amount, 0)
);

export const selectActiveGoals = createSelector(
  [selectGoals],
  (goals) => goals.filter((g) => g.currentAmount < g.targetAmount)
);

export const selectCompletedGoals = createSelector(
  [selectGoals],
  (goals) => goals.filter((g) => g.currentAmount >= g.targetAmount)
);

export const selectGoalProgress = createSelector(
  [selectGoals],
  (goals) => goals.map((goal) => ({
    ...goal,
    progress: Math.round((goal.currentAmount / goal.targetAmount) * 100),
  }))
);

export const selectTransactionsByCategory = createSelector(
  [selectTransactions],
  (transactions) => {
    const categoryMap = new Map<string, number>();
    transactions.forEach((t) => {
      const current = categoryMap.get(t.category) || 0;
      categoryMap.set(t.category, current + t.amount);
    });
    return Array.from(categoryMap.entries()).map(([category, amount]) => ({
      category,
      amount,
    }));
  }
);

export const selectDashboardSummary = createSelector(
  [selectStats, selectTransactions, selectGoals],
  (stats, transactions, goals) => ({
    stats,
    totalTransactions: transactions.length,
    totalGoals: goals.length,
    activeGoals: goals.filter((g) => g.currentAmount < g.targetAmount).length,
  })
);
