import { useLocalStorageStore } from "./useLocalStorageStore";
import type { DashboardState } from "slices/dashboardSlice";

export const useDashboardStore = () => {
  const [dashboard, setDashboard, clearDashboard] =
    useLocalStorageStore<DashboardState>("dashboard", {
      balance: 0,
      income: 0,
      expenses: 0,
      savings: 0,
      transactions: [],
      goals: [],
    });

  return { dashboard, setDashboard, clearDashboard };
};
