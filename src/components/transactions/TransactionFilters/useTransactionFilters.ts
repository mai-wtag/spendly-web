import { useState } from "react";

export const useTransactionFilters = () => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => setShowFilters(!showFilters);
  const closeFilters = () => setShowFilters(false);

  return {
    showFilters,
    toggleFilters,
    closeFilters,
  };
};
