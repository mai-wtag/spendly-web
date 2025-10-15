import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import type { AppDispatch } from "reduxToolkit/store";
import { addTransaction } from "reduxToolkit/dashboard/dashboardThunks";
import { selectLoading } from "reduxToolkit/dashboard/dashboardSelectors";
import type { TransactionType } from "utils/dashboardTypes";

export const useTransactionForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectLoading);

  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");

  const resetForm = () => {
    setAmount("");
    setCategory("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  const validateForm = (): boolean => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");

      return false;
    }

    if (!category) {
      toast.error("Please select a category");

      return false;
    }

    if (!description.trim()) {
      toast.error("Please add a description");
      
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch(
      addTransaction({
        description: description.trim(),
        amount: parseFloat(amount),
        type,
        category,
      })
    );

    resetForm();
  };

  return {
    type,
    setType,
    amount,
    setAmount,
    category,
    setCategory,
    date,
    setDate,
    description,
    setDescription,
    loading,
    handleSubmit,
  };
};
