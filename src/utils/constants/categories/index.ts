export const TRANSACTION_CATEGORIES = {
  income: [
    "Salary",
    "Freelance",
    "Investment",
    "Business",
    "Gift",
    "Other Income",
  ],
  expense: [
    "Groceries",
    "Rent",
    "Utilities",
    "Transportation",
    "Entertainment",
    "Healthcare",
    "Education",
    "Shopping",
    "Dining",
    "Travel",
    "Insurance",
    "Other Expense",
  ],
} as const;

export type IncomeCategory = typeof TRANSACTION_CATEGORIES.income[number];
export type ExpenseCategory = typeof TRANSACTION_CATEGORIES.expense[number];
export type TransactionCategory = IncomeCategory | ExpenseCategory;
