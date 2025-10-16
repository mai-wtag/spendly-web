import { describe, it, expect } from 'vitest';
import dashboardReducer, {
  addTransaction,
  deleteTransaction,
  addGoal,
  updateGoalProgress,
  deleteGoal,
  addBudget,
  deleteBudget,
} from '../../dashboard/dashboardSlice';
import type { DashboardState } from 'utils/dashboardTypes';

describe('dashboardSlice', () => {
  const initialState: DashboardState = {
    stats: {
      totalBalance: 0,
      monthlyIncome: 0,
      monthlyExpense: 0,
      monthlySavings: 0,
    },
    transactions: [],
    goals: [],
    budgets: [],
    cashFlow: [
      { month: 'Jul', income: 0, expense: 0 },
      { month: 'Aug', income: 0, expense: 0 },
      { month: 'Sep', income: 0, expense: 0 },
      { month: 'Oct', income: 0, expense: 0 },
      { month: 'Nov', income: 0, expense: 0 },
      { month: 'Dec', income: 0, expense: 0 },
    ],
    loading: false,
    error: null,
  };

  describe('addTransaction', () => {
    it('should add income transaction and update stats', () => {
      const state = dashboardReducer(
        initialState,
        addTransaction({
          description: 'Salary',
          amount: 5000,
          type: 'income',
          category: 'Salary',
        })
      );

      expect(state.transactions).toHaveLength(1);
      expect(state.stats.monthlyIncome).toBe(5000);
      expect(state.stats.totalBalance).toBe(5000);
      expect(state.stats.monthlySavings).toBe(5000);
    });

    it('should add expense transaction and update stats', () => {
      const state = dashboardReducer(
        initialState,
        addTransaction({
          description: 'Groceries',
          amount: 100,
          type: 'expense',
          category: 'Groceries',
        })
      );

      expect(state.transactions).toHaveLength(1);
      expect(state.stats.monthlyExpense).toBe(100);
      expect(state.stats.totalBalance).toBe(-100);
      expect(state.stats.monthlySavings).toBe(-100);
    });
  });

  describe('deleteTransaction', () => {
    it('should delete transaction and update stats', () => {
      let state = dashboardReducer(
        initialState,
        addTransaction({
          description: 'Salary',
          amount: 5000,
          type: 'income',
          category: 'Salary',
        })
      );

      const transactionId = state.transactions[0].id;
      state = dashboardReducer(state, deleteTransaction(transactionId));

      expect(state.transactions).toHaveLength(0);
      expect(state.stats.monthlyIncome).toBe(0);
      expect(state.stats.totalBalance).toBe(0);
    });
  });

  describe('addGoal', () => {
    it('should add goal', () => {
      const state = dashboardReducer(
        initialState,
        addGoal({
          title: 'Save for Laptop',
          targetAmount: 1500,
          deadline: '2024-12-31',
          category: 'Electronics',
        })
      );

      expect(state.goals).toHaveLength(1);
      expect(state.goals[0].title).toBe('Save for Laptop');
      expect(state.goals[0].currentAmount).toBe(0);
    });
  });

  describe('updateGoalProgress', () => {
    it('should update goal progress', () => {
      let state = dashboardReducer(
        initialState,
        addGoal({
          title: 'Save for Laptop',
          targetAmount: 1500,
          deadline: '2024-12-31',
          category: 'Electronics',
        })
      );

      const goalId = state.goals[0].id;
      state = dashboardReducer(
        state,
        updateGoalProgress({ id: goalId, amount: 500 })
      );

      expect(state.goals[0].currentAmount).toBe(500);
    });

    it('should not exceed target amount', () => {
      let state = dashboardReducer(
        initialState,
        addGoal({
          title: 'Save for Laptop',
          targetAmount: 1000,
          deadline: '2024-12-31',
          category: 'Electronics',
        })
      );

      const goalId = state.goals[0].id;
      state = dashboardReducer(
        state,
        updateGoalProgress({ id: goalId, amount: 1500 })
      );

      expect(state.goals[0].currentAmount).toBe(1000);
    });
  });

  describe('deleteGoal', () => {
    it('should delete goal', () => {
      let state = dashboardReducer(
        initialState,
        addGoal({
          title: 'Test Goal',
          targetAmount: 1000,
          deadline: '2024-12-31',
          category: 'Savings',
        })
      );

      const goalId = state.goals[0].id;
      state = dashboardReducer(state, deleteGoal(goalId));

      expect(state.goals).toHaveLength(0);
    });
  });

  describe('addBudget', () => {
    it('should add budget', () => {
      const state = dashboardReducer(
        initialState,
        addBudget({
          category: 'Groceries',
          limit: 500,
        })
      );

      expect(state.budgets).toHaveLength(1);
      expect(state.budgets[0].category).toBe('Groceries');
      expect(state.budgets[0].limit).toBe(500);
    });
  });

  describe('deleteBudget', () => {
    it('should delete budget', () => {
      let state = dashboardReducer(
        initialState,
        addBudget({
          category: 'Groceries',
          limit: 500,
        })
      );

      const budgetId = state.budgets[0].id;
      state = dashboardReducer(state, deleteBudget(budgetId));

      expect(state.budgets).toHaveLength(0);
    });
  });
});
