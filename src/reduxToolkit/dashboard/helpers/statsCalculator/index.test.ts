import { describe, it, expect } from 'vitest';
import {
  updateCashFlowForTransaction,
  removeCashFlowForTransaction,
  calculateStatsFromTransactions,
} from '../../../dashboard/helpers/statsCalculator';
import type { Transaction, CashFlowData } from '../../../../utils/dashboardTypes';

describe('statsCalculator', () => {
  describe('updateCashFlowForTransaction', () => {
    it('should update income for income transaction', () => {
      const cashFlow: CashFlowData[] = [
        { month: 'Jan', income: 0, expense: 0 },
        { month: 'Feb', income: 0, expense: 0 },
      ];

      const transaction: Transaction = {
        id: '1',
        description: 'Salary',
        amount: 5000,
        type: 'income',
        category: 'Salary',
        date: '2024-01-15',
        createdAt: '2024-01-15T00:00:00Z',
      };

      updateCashFlowForTransaction(cashFlow, transaction);

      expect(cashFlow[0].income).toBe(5000);
      expect(cashFlow[0].expense).toBe(0);
    });

    it('should update expense for expense transaction', () => {
      const cashFlow: CashFlowData[] = [
        { month: 'Jan', income: 0, expense: 0 },
      ];

      const transaction: Transaction = {
        id: '1',
        description: 'Groceries',
        amount: 100,
        type: 'expense',
        category: 'Groceries',
        date: '2024-01-15',
        createdAt: '2024-01-15T00:00:00Z',
      };

      updateCashFlowForTransaction(cashFlow, transaction);

      expect(cashFlow[0].expense).toBe(100);
      expect(cashFlow[0].income).toBe(0);
    });
  });

  describe('removeCashFlowForTransaction', () => {
    it('should remove income from cash flow', () => {
      const cashFlow: CashFlowData[] = [
        { month: 'Jan', income: 5000, expense: 0 },
      ];

      const transaction: Transaction = {
        id: '1',
        description: 'Salary',
        amount: 2000,
        type: 'income',
        category: 'Salary',
        date: '2024-01-15',
        createdAt: '2024-01-15T00:00:00Z',
      };

      removeCashFlowForTransaction(cashFlow, transaction);

      expect(cashFlow[0].income).toBe(3000);
    });

    it('should remove expense from cash flow', () => {
      const cashFlow: CashFlowData[] = [
        { month: 'Jan', income: 0, expense: 500 },
      ];

      const transaction: Transaction = {
        id: '1',
        description: 'Groceries',
        amount: 100,
        type: 'expense',
        category: 'Groceries',
        date: '2024-01-15',
        createdAt: '2024-01-15T00:00:00Z',
      };

      removeCashFlowForTransaction(cashFlow, transaction);

      expect(cashFlow[0].expense).toBe(400);
    });
  });

  describe('calculateStatsFromTransactions', () => {
    it('should calculate stats correctly', () => {
      const transactions: Transaction[] = [
        {
          id: '1',
          description: 'Salary',
          amount: 5000,
          type: 'income',
          category: 'Salary',
          date: '2024-01-15',
          createdAt: '2024-01-15T00:00:00Z',
        },
        {
          id: '2',
          description: 'Groceries',
          amount: 200,
          type: 'expense',
          category: 'Groceries',
          date: '2024-01-20',
          createdAt: '2024-01-20T00:00:00Z',
        },
      ];

      const initialCashFlow: CashFlowData[] = [
        { month: 'Jan', income: 0, expense: 0 },
      ];

      const { stats, cashFlow } = calculateStatsFromTransactions(
        transactions,
        initialCashFlow
      );

      expect(stats.monthlyIncome).toBe(5000);
      expect(stats.monthlyExpense).toBe(200);
      expect(stats.totalBalance).toBe(4800);
      expect(stats.monthlySavings).toBe(4800);
      expect(cashFlow[0].income).toBe(5000);
      expect(cashFlow[0].expense).toBe(200);
    });

    it('should handle empty transactions', () => {
      const initialCashFlow: CashFlowData[] = [
        { month: 'Jan', income: 0, expense: 0 },
      ];

      const { stats } = calculateStatsFromTransactions([], initialCashFlow);

      expect(stats.monthlyIncome).toBe(0);
      expect(stats.monthlyExpense).toBe(0);
      expect(stats.totalBalance).toBe(0);
      expect(stats.monthlySavings).toBe(0);
    });
  });
});
