import type { Budget, AddBudgetPayload } from "utils/dashboardTypes";

export const createBudget = (payload: AddBudgetPayload): Budget => {
  return {
    id: `budget-${Date.now()}`,
    category: payload.category,
    limit: payload.limit,
  };
};
