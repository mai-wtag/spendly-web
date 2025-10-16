import { describe, it, expect } from 'vitest';
import {
  selectRecentTransactions,
  selectActiveGoals,
  selectCompletedGoals,
  selectSavingsRate,
} from '../../dashboard/dashboardSelectors';
import type { RootState } from 'reduxToolkit/store';

describe('dashboardSelectors', () => {
  const mockState: RootState = {
    auth: {
      user: null,
      isAuthenticated: false,
      loading: false,
      forgotEmail: null,
      isInitialized: false,
    },
    dashboard: {
      stats: {
        totalBalance: 1000,
        monthlyIncome: 5000,
        monthlyExpense: 4000,
        monthlySavings: 1000,
      },
      transactions: [
        {
          id: '1',
          description: 'Transaction 1',
          amount: 100,
          type: 'expense',
          category: 'Groceries',
          date: '2024-01-01',
          createdAt: '2024-01-01T00:00:00Z',
        },
        {
          id: '2',
          description: 'Transaction 2',
          amount: 200,
          type: 'income',
          category: 'Salary',
          date: '2024-01-02',
          createdAt: '2024-01-02T00:00:00Z',
        },
        {
          id: '3',
          description: 'Transaction 3',
          amount: 300,
          type: 'expense',
          category: 'Dining',
          date: '2024-01-03',
          createdAt: '2024-01-03T00:00:00Z',
        },
        {
          id: '4',
          description: 'Transaction 4',
          amount: 400,
          type: 'income',
          category: 'Freelance',
          date: '2024-01-04',
          createdAt: '2024-01-04T00:00:00Z',
        },
        {
          id: '5',
          description: 'Transaction 5',
          amount: 500,
          type: 'expense',
          category: 'Shopping',
          date: '2024-01-05',
          createdAt: '2024-01-05T00:00:00Z',
        },
        {
          id: '6',
          description: 'Transaction 6',
          amount: 600,
          type: 'income',
          category: 'Investment',
          date: '2024-01-06',
          createdAt: '2024-01-06T00:00:00Z',
        },
      ],
      goals: [
        {
          id: '1',
          title: 'Active Goal 1',
          targetAmount: 1000,
          currentAmount: 500,
          deadline: '2024-12-31',
          category: 'Savings',
        },
        {
          id: '2',
          title: 'Completed Goal',
          targetAmount: 1000,
          currentAmount: 1000,
          deadline: '2024-12-31',
          category: 'Electronics',
        },
        {
          id: '3',
          title: 'Active Goal 2',
          targetAmount: 2000,
          currentAmount: 800,
          deadline: '2024-12-31',
          category: 'Travel',
        },
      ],
      budgets: [],
      cashFlow: [],
      loading: false,
      error: null,
    },
  };

  describe('selectRecentTransactions', () => {
    it('should return only first 5 transactions', () => {
      const recent = selectRecentTransactions(mockState);
      expect(recent).toHaveLength(5);
    });

    it('should return transactions in original order', () => {
      const recent = selectRecentTransactions(mockState);
      expect(recent[0].id).toBe('1');
      expect(recent[4].id).toBe('5');
    });
  });

  describe('selectActiveGoals', () => {
    it('should return only incomplete goals', () => {
      const active = selectActiveGoals(mockState);
      expect(active).toHaveLength(2);
      expect(active.every((g) => g.currentAmount < g.targetAmount)).toBe(true);
    });
  });

  describe('selectCompletedGoals', () => {
    it('should return only completed goals', () => {
      const completed = selectCompletedGoals(mockState);
      expect(completed).toHaveLength(1);
      expect(completed[0].title).toBe('Completed Goal');
      expect(completed.every((g) => g.currentAmount >= g.targetAmount)).toBe(true);
    });
  });

  describe('selectSavingsRate', () => {
    it('should calculate savings rate correctly', () => {
      const rate = selectSavingsRate(mockState);
      expect(rate).toBe(20); // (1000 / 5000) * 100
    });

    it('should return 0 when income is 0', () => {
      const stateWithNoIncome: RootState = {
        ...mockState,
        dashboard: {
          ...mockState.dashboard,
          stats: {
            ...mockState.dashboard.stats,
            monthlyIncome: 0,
            monthlySavings: 0,
          },
        },
      };

      const rate = selectSavingsRate(stateWithNoIncome);
      expect(rate).toBe(0);
    });
  });
});
