import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  date: string;
}

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  progress: number;
}

interface DashboardState {
  balance: number;
  income: number;
  expenses: number;
  savings: number;
  transactions: Transaction[];
  goals: Goal[];
}

const loadState = (): DashboardState => {
  const saved = localStorage.getItem("dashboard");
  if (saved) return JSON.parse(saved);
  return {
    balance: 0,
    income: 0,
    expenses: 0,
    savings: 0,
    transactions: [],
    goals: [],
  };
};


const saveState = (state: DashboardState) => {
  localStorage.setItem("dashboard", JSON.stringify(state));
};

const initialState: DashboardState = loadState();

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      const t = action.payload;
      state.transactions.push(t);

      if (t.type === "income") {
        state.income += t.amount;
        state.balance += t.amount;
      } else {
        state.expenses += t.amount;
        state.balance -= t.amount;
      }

      state.savings = state.balance - state.expenses;
      saveState(state);
    },

    addGoal: (state, action: PayloadAction<Goal>) => {
      state.goals.push(action.payload);
      saveState(state);
    },


    updateBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
      saveState(state);
    },
    updateIncome: (state, action: PayloadAction<number>) => {
      state.income = action.payload;
      saveState(state);
    },
    updateExpenses: (state, action: PayloadAction<number>) => {
      state.expenses = action.payload;
      saveState(state);
    },
    updateSavings: (state, action: PayloadAction<number>) => {
      state.savings = action.payload;
      saveState(state);
    },

    clearDashboard: (state) => {
      state.balance = 0;
      state.income = 0;
      state.expenses = 0;
      state.savings = 0;
      state.transactions = [];
      state.goals = [];
      saveState(state);
    },
  },
});

export const {
  addTransaction,
  addGoal,
  updateBalance,
  updateIncome,
  updateExpenses,
  updateSavings,
  clearDashboard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
