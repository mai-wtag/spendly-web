import toast from "react-hot-toast";
import type { Transaction } from "utils/dashboardTypes";

export const exportToExcel = (
  transactions: Transaction[],
  startDate: string,
  endDate: string
): void => {
  if (transactions.length === 0) {
    toast("No transactions to export");

    return;
  }

  const escapeCSVField = (field: string | number): string => {
    const str = String(field);

    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }

    return str;
  };

  const formatDateForExcel = (dateString: string): string => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

  const headers = ["Date", "Description", "Category", "Type", "Amount"];
  
  const rows = transactions.map((t) => {
    const date = formatDateForExcel(t.date);
    const description = escapeCSVField(t.description);
    const category = escapeCSVField(t.category);
    const type = t.type.charAt(0).toUpperCase() + t.type.slice(1);
    const amount = t.type === "income" ? t.amount.toFixed(2) : `-${t.amount.toFixed(2)}`;
    
    return [date, description, category, type, amount];
  });

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const netAmount = totalIncome - totalExpense;

  rows.push(["", "", "", "", ""]); 
  rows.push(["", "", "Total Income", "", totalIncome.toFixed(2)]);
  rows.push(["", "", "Total Expense", "", totalExpense.toFixed(2)]);
  rows.push(["", "", "Net Amount", "", netAmount.toFixed(2)]);
  rows.push(["", "", "", "", ""]); 
  rows.push([
    "",
    "",
    "Period",
    `${formatDateForExcel(startDate)} to ${formatDateForExcel(endDate)}`,
    "",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\r\n");

  const BOM = "\uFEFF";
  const csvWithBOM = BOM + csvContent;

  const blob = new Blob([csvWithBOM], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  const fileStartDate = formatDateForExcel(startDate).replace(/\//g, "-");
  const fileEndDate = formatDateForExcel(endDate).replace(/\//g, "-");

  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `Spendly_Transactions_${fileStartDate}_to_${fileEndDate}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const getCategoryTotals = (
  transactions: Transaction[]
): Array<{ category: string; amount: number; percentage: number }> => {
  const expenseTransactions = transactions.filter((t) => t.type === "expense");

  if (expenseTransactions.length === 0) return [];

  const categoryMap = new Map<string, number>();

  expenseTransactions.forEach((t) => {
    const current = categoryMap.get(t.category) || 0;
    categoryMap.set(t.category, current + t.amount);
  });

  const total = Array.from(categoryMap.values()).reduce(
    (sum, amount) => sum + amount,
    0
  );

  return Array.from(categoryMap.entries())
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: (amount / total) * 100,
    }))
    .sort((a, b) => b.amount - a.amount);
};
