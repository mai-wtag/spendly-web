import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "reduxToolkit/store";
import { useLocalStorageStore } from "hooks/useLocalStorageStore";
import { setTransactions, setGoals } from "reduxToolkit/dashboard/dashboardSlice";
import type { Transaction, Goal } from "utils/dashboardTypes";

export const useDashboardSync = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const [transactions] = useLocalStorageStore<Transaction[]>("transactions", []);
  const [goals] = useLocalStorageStore<Goal[]>("goals", []);

  useEffect(() => {
    if (transactions) {
      dispatch(setTransactions(transactions));
    }
  }, [transactions, dispatch]);

  useEffect(() => {
    if (goals) {
      dispatch(setGoals(goals));
    }
  }, [goals, dispatch]);
};
