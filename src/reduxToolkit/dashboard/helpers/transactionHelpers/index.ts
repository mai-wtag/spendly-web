import type { Transaction } from "utils/dashboardTypes";

export const createTransaction = (payload: Omit<Transaction, "id" | "date" | "createdAt">): Transaction => {
  return {
    id: `txn-${Date.now()}`,
    description: payload.description,
    amount: payload.amount,
    type: payload.type,
    category: payload.category,
    date: new Date().toISOString().split("T")[0],
    createdAt: new Date().toISOString(),
  };
};

export const createGoal = (payload: { title: string; targetAmount: number; deadline: string; category: string }) => {
  return {
    id: `goal-${Date.now()}`,
    title: payload.title,
    targetAmount: payload.targetAmount,
    currentAmount: 0,
    deadline: payload.deadline,
    category: payload.category,
  };
};
