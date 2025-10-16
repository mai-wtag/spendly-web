import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatCurrencyWithSign,
  formatRelativeDate,
  formatFullDate,
  formatGoalDeadline,
} from '../../utils/helpers';

describe('formatCurrency', () => {
  it('should format positive amounts correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1234.56');
  });

  it('should format negative amounts as positive', () => {
    expect(formatCurrency(-1234.56)).toBe('$1234.56');
  });

  it('should format zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('should handle decimal precision', () => {
    expect(formatCurrency(10.5)).toBe('$10.50');
  });
});

describe('formatCurrencyWithSign', () => {
  it('should format income with plus sign', () => {
    expect(formatCurrencyWithSign(100, 'income')).toBe('+$100.00');
  });

  it('should format expense with minus sign', () => {
    expect(formatCurrencyWithSign(50, 'expense')).toBe('-$50.00');
  });

  it('should handle negative amounts correctly', () => {
    expect(formatCurrencyWithSign(-100, 'income')).toBe('+$100.00');
  });
});

describe('formatRelativeDate', () => {
  it('should return "Today" for current date', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(formatRelativeDate(today)).toBe('Today');
  });

  it('should return "Yesterday" for yesterday', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateString = yesterday.toISOString().split('T')[0];
    expect(formatRelativeDate(dateString)).toBe('Yesterday');
  });

  it('should return formatted date for older dates', () => {
    const result = formatRelativeDate('2024-01-15');
    expect(result).toMatch(/Jan 15/);
  });
});

describe('formatFullDate', () => {
  it('should format date correctly', () => {
    const result = formatFullDate('2024-03-15');
    expect(result).toBe('Mar 15, 2024');
  });

  it('should handle different date formats', () => {
    const result = formatFullDate('2024-12-31');
    expect(result).toBe('Dec 31, 2024');
  });
});

describe('formatGoalDeadline', () => {
  it('should format goal deadline correctly', () => {
    const result = formatGoalDeadline('2025-06-30');
    expect(result).toBe('Jun 30, 2025');
  });
});
