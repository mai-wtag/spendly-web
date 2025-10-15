import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  DashboardState,
  Transaction,
  Goal,
  AddTransactionPayload,
  AddGoalPayload,
} from "utils/dashboardTypes";
import {
  calculateStatsFromTransactions,
  updateCashFlowForTransaction,
  removeCashFlowForTransaction,
} from "reduxToolkit/dashboard/helpers/statsCalculator";
import { createTransaction, createGoal } from "reduxToolkit/dashboard/helpers/transactionHelpers";

const initialState: DashboardState = {
  stats: {
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpense: 0,
    monthlySavings: 0,
  },
  transactions: [],
  goals: [],
  cashFlow: [
    { month: "Jul", income: 0, expense: 0 },
    { month: "Aug", income: 0, expense: 0 },
    { month: "Sep", income: 0, expense: 0 },
    { month: "Oct", income: 0, expense: 0 },
    { month: "Nov", income: 0, expense: 0 },
    { month: "Dec", income: 0, expense: 0 },
  ],
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<AddTransactionPayload>) => {
      const newTransaction = createTransaction(action.payload);
      state.transactions.unshift(newTransaction);

      if (newTransaction.type === "income") {
        state.stats.monthlyIncome += newTransaction.amount;
        state.stats.totalBalance += newTransaction.amount;
      } else {
        state.stats.monthlyExpense += newTransaction.amount;
        state.stats.totalBalance -= newTransaction.amount;
      }

      state.stats.monthlySavings =
        state.stats.monthlyIncome - state.stats.monthlyExpense;

      updateCashFlowForTransaction(state.cashFlow, newTransaction);
    },

    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(
        (t) => t.id === action.payload.id
      );

      if (index !== -1) {
        const oldTransaction = state.transactions[index];

        if (oldTransaction.type === "income") {
          state.stats.monthlyIncome -= oldTransaction.amount;
          state.stats.totalBalance -= oldTransaction.amount;
        } else {
          state.stats.monthlyExpense -= oldTransaction.amount;
          state.stats.totalBalance += oldTransaction.amount;
        }

        removeCashFlowForTransaction(state.cashFlow, oldTransaction);

        state.transactions[index] = action.payload;

        if (action.payload.type === "income") {
          state.stats.monthlyIncome += action.payload.amount;
          state.stats.totalBalance += action.payload.amount;
        } else {
          state.stats.monthlyExpense += action.payload.amount;
          state.stats.totalBalance -= action.payload.amount;
        }

        state.stats.monthlySavings =
          state.stats.monthlyIncome - state.stats.monthlyExpense;
        updateCashFlowForTransaction(state.cashFlow, action.payload);
      }
    },

    deleteTransaction: (state, action: PayloadAction<string>) => {
      const transaction = state.transactions.find(
        (t) => t.id === action.payload
      );

      if (transaction) {
        if (transaction.type === "income") {
          state.stats.monthlyIncome -= transaction.amount;
          state.stats.totalBalance -= transaction.amount;
        } else {
          state.stats.monthlyExpense -= transaction.amount;
          state.stats.totalBalance += transaction.amount;
        }

        state.stats.monthlySavings =
          state.stats.monthlyIncome - state.stats.monthlyExpense;

        removeCashFlowForTransaction(state.cashFlow, transaction);

        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload
        );
      }
    },

    addGoal: (state, action: PayloadAction<AddGoalPayload>) => {
      const newGoal = createGoal(action.payload);
      state.goals.push(newGoal);
    },

    updateGoalProgress: (
      state,
      action: PayloadAction<{ id: string; amount: number }>
    ) => {
      const goal = state.goals.find((g) => g.id === action.payload.id);

      if (goal) {
        goal.currentAmount += action.payload.amount;
        if (goal.currentAmount > goal.targetAmount) {
          goal.currentAmount = goal.targetAmount;
        }
      }
    },

    deleteGoal: (state, action: PayloadAction<string>) => {
      state.goals = state.goals.filter((g) => g.id !== action.payload);
    },

    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
      const { stats, cashFlow } = calculateStatsFromTransactions(
        action.payload,
        state.cashFlow
      );
      state.stats = stats;
      state.cashFlow = cashFlow;
    },

    setGoals: (state, action: PayloadAction<Goal[]>) => {
      state.goals = action.payload;
    },

    updateStats: (
      state,
      action: PayloadAction<Partial<DashboardState["stats"]>>
    ) => {
      state.stats = { ...state.stats, ...action.payload };
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    resetDashboard: () => initialState,
  },
});

export const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  addGoal,
  updateGoalProgress,
  deleteGoal,
  setTransactions,
  setGoals,
  updateStats,
  setLoading,
  setError,
  resetDashboard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
