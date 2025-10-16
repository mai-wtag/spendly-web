import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createBudget } from '../../../dashboard/helpers/budgetHelpers';

describe('budgetHelpers', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('createBudget', () => {
    it('should create budget with correct properties', () => {
      const now = new Date('2024-01-15T10:00:00Z');
      vi.setSystemTime(now);

      const payload = {
        category: 'Groceries',
        limit: 500,
      };

      const budget = createBudget(payload);

      expect(budget).toMatchObject({
        category: 'Groceries',
        limit: 500,
      });
      expect(budget.id).toMatch(/^budget-/);
    });

    it('should generate unique IDs', () => {
      const payload = {
        category: 'Dining',
        limit: 300,
      };

      const budget1 = createBudget(payload);
      vi.advanceTimersByTime(10);
      const budget2 = createBudget(payload);

      expect(budget1.id).not.toBe(budget2.id);
    });
  });
});
