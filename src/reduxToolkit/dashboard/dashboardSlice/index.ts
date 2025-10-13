import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { 
  DashboardState, 
  Transaction, 
  Goal,
  AddTransactionPayload,
  AddGoalPayload 
} from "utils/types/dashboard.types";

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
      const newTransaction: Transaction = {
        id: `txn-${Date.now()}`,
        ...action.payload,
        date: new Date().toISOString().split("T")[0],
        createdAt: new Date().toISOString(),
      };
      state.transactions.unshift(newTransaction);

      if (newTransaction.type === "income") {
        state.stats.monthlyIncome += newTransaction.amount;
        state.stats.totalBalance += newTransaction.amount;
      } else {
        state.stats.monthlyExpense += newTransaction.amount;
        state.stats.totalBalance -= newTransaction.amount;
      }
      state.stats.monthlySavings = state.stats.monthlyIncome - state.stats.monthlyExpense;

      const currentMonth = new Date().toLocaleString("en-US", { month: "short" });
      const currentMonthData = state.cashFlow.find((cf) => cf.month === currentMonth);
      if (currentMonthData) {
        if (newTransaction.type === "income") {
          currentMonthData.income += newTransaction.amount;
        } else {
          currentMonthData.expense += newTransaction.amount;
        }
      }
    },

    deleteTransaction: (state, action: PayloadAction<string>) => {
      const transaction = state.transactions.find((t) => t.id === action.payload);
      if (transaction) {
        if (transaction.type === "income") {
          state.stats.monthlyIncome -= transaction.amount;
          state.stats.totalBalance -= transaction.amount;
        } else {
          state.stats.monthlyExpense -= transaction.amount;
          state.stats.totalBalance += transaction.amount;
        }
        state.stats.monthlySavings = state.stats.monthlyIncome - state.stats.monthlyExpense;

        const transactionMonth = new Date(transaction.date).toLocaleString("en-US", { month: "short" });
        const monthData = state.cashFlow.find((cf) => cf.month === transactionMonth);
        if (monthData) {
          if (transaction.type === "income") {
            monthData.income -= transaction.amount;
          } else {
            monthData.expense -= transaction.amount;
          }
        }

        state.transactions = state.transactions.filter((t) => t.id !== action.payload);
      }
    },

    addGoal: (state, action: PayloadAction<AddGoalPayload>) => {
      const newGoal: Goal = {
        id: `goal-${Date.now()}`,
        ...action.payload,
        currentAmount: 0,
      };
      state.goals.push(newGoal);
    },

    updateGoalProgress: (state, action: PayloadAction<{ id: string; amount: number }>) => {
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
      
      let income = 0;
      let expense = 0;
      const cashFlowMap = new Map<string, { income: number; expense: number }>();

      action.payload.forEach((txn) => {
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

      state.stats.monthlyIncome = income;
      state.stats.monthlyExpense = expense;
      state.stats.totalBalance = income - expense;
      state.stats.monthlySavings = income - expense;

      state.cashFlow = state.cashFlow.map((cf) => {
        const data = cashFlowMap.get(cf.month);
        return data ? { ...cf, ...data } : cf;
      });
    },

    setGoals: (state, action: PayloadAction<Goal[]>) => {
      state.goals = action.payload;
    },

    updateStats: (state, action: PayloadAction<Partial<typeof state.stats>>) => {
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
