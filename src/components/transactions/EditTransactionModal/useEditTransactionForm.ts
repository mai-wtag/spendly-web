import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import type { AppDispatch } from "reduxToolkit/store";
import { updateTransaction } from "reduxToolkit/dashboard/dashboardThunks";
import { selectLoading } from "reduxToolkit/dashboard/dashboardSelectors";
import type { Transaction } from "utils/dashboardTypes";

export const useEditTransactionForm = (
  transaction: Transaction,
  onClose: () => void
) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectLoading);

  const [amount, setAmount] = useState(transaction.amount.toString());
  const [category, setCategory] = useState(transaction.category);
  const [date, setDate] = useState(transaction.date);
  const [description, setDescription] = useState(transaction.description);

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

    if (!validateForm()) {
        return;
    }

    dispatch(
      updateTransaction({
        ...transaction,
        amount: parseFloat(amount),
        category,
        date,
        description: description.trim(),
      })
    );

    onClose();
  };

  return {
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
