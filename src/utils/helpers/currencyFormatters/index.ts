export const formatCurrency = (amount: number): string => {
  return `$${Math.abs(amount).toFixed(2)}`;
};

export const formatCurrencyWithSign = (amount: number, type: "income" | "expense"): string => {
  const sign = type === "income" ? "+" : "-";
  
  return `${sign}$${Math.abs(amount).toFixed(2)}`;
};
