export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
  createdAt: string;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
}

export interface FinancialStats {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpense: number;
  monthlySavings: number;
}

export interface CashFlowData {
  month: string;
  income: number;
  expense: number;
}

export interface DashboardState {
  stats: FinancialStats;
  transactions: Transaction[];
  goals: Goal[];
  cashFlow: CashFlowData[];
  loading: boolean;
  error: string | null;
}

export type TransactionType = "income" | "expense";

export interface AddTransactionPayload {
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
}

export interface AddGoalPayload {
  title: string;
  targetAmount: number;
  deadline: string;
  category: string;
}
