import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createTransaction, createGoal } from '../../../dashboard/helpers/transactionHelpers';

describe('transactionHelpers', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('createTransaction', () => {
    it('should create transaction with correct properties', () => {
      const now = new Date('2024-01-15T10:00:00Z');
      vi.setSystemTime(now);

      const payload = {
        description: 'Test Transaction',
        amount: 100,
        type: 'expense' as const,
        category: 'Groceries',
      };

      const transaction = createTransaction(payload);

      expect(transaction).toMatchObject({
        description: 'Test Transaction',
        amount: 100,
        type: 'expense',
        category: 'Groceries',
        date: '2024-01-15',
      });
      expect(transaction.id).toMatch(/^txn-/);
      expect(transaction.createdAt).toBe(now.toISOString());
    });

    it('should generate unique IDs', () => {
      const payload = {
        description: 'Test',
        amount: 50,
        type: 'income' as const,
        category: 'Salary',
      };

      const transaction1 = createTransaction(payload);
      vi.advanceTimersByTime(10);
      const transaction2 = createTransaction(payload);

      expect(transaction1.id).not.toBe(transaction2.id);
    });
  });

  describe('createGoal', () => {
    it('should create goal with correct properties', () => {
      const now = new Date('2024-01-15T10:00:00Z');
      vi.setSystemTime(now);

      const payload = {
        title: 'Save for Laptop',
        targetAmount: 1500,
        deadline: '2024-12-31',
        category: 'Electronics',
      };

      const goal = createGoal(payload);

      expect(goal).toMatchObject({
        title: 'Save for Laptop',
        targetAmount: 1500,
        currentAmount: 0,
        deadline: '2024-12-31',
        category: 'Electronics',
      });
      expect(goal.id).toMatch(/^goal-/);
    });

    it('should initialize currentAmount to 0', () => {
      const payload = {
        title: 'Test Goal',
        targetAmount: 1000,
        deadline: '2024-12-31',
        category: 'Savings',
      };

      const goal = createGoal(payload);
      expect(goal.currentAmount).toBe(0);
    });
  });
});
