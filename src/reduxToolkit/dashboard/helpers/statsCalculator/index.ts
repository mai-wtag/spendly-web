import type { Transaction, CashFlowData, FinancialStats } from "utils/dashboardTypes";

export const updateCashFlowForTransaction = (
  cashFlow: CashFlowData[],
  transaction: Transaction
): void => {
  const currentMonth = new Date(transaction.date).toLocaleString("en-US", { month: "short" });
  const currentMonthData = cashFlow.find((cf) => cf.month === currentMonth);

  if (currentMonthData) {
    if (transaction.type === "income") {
      currentMonthData.income += transaction.amount;
    } else {
      currentMonthData.expense += transaction.amount;
    }
  }
};

export const removeCashFlowForTransaction = (
  cashFlow: CashFlowData[],
  transaction: Transaction
): void => {
  const transactionMonth = new Date(transaction.date).toLocaleString("en-US", { month: "short" });
  const monthData = cashFlow.find((cf) => cf.month === transactionMonth);

  if (monthData) {
    if (transaction.type === "income") {
      monthData.income -= transaction.amount;
    } else {
      monthData.expense -= transaction.amount;
    }
  }
};

export const calculateStatsFromTransactions = (
  transactions: Transaction[],
  initialCashFlow: CashFlowData[]
): { stats: FinancialStats; cashFlow: CashFlowData[] } => {
  let income = 0;
  let expense = 0;
  const cashFlowMap = new Map<string, { income: number; expense: number }>();

  transactions.forEach((txn) => {
    if (txn.type === "income") {
      income += txn.amount;
    } else {
      expense += txn.amount;
    }

    const month = new Date(txn.date).toLocaleString("en-US", { month: "short" });
    const current = cashFlowMap.get(month) || { income: 0, expense: 0 };

    if (txn.type === "income") {
      current.income += txn.amount;
    } else {
      current.expense += txn.amount;
    }

    cashFlowMap.set(month, current);
  });

  const stats: FinancialStats = {
    monthlyIncome: income,
    monthlyExpense: expense,
    totalBalance: income - expense,
    monthlySavings: income - expense,
  };

  const cashFlow = initialCashFlow.map((cf) => {
    const data = cashFlowMap.get(cf.month);
    
    return data ? { ...cf, ...data } : cf;
  });

  return { stats, cashFlow };
};
