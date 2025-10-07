import React from "react";
import Card from "components/dashboard/Card";
import { useDashboardStore } from "hooks/useDashboardStore";

const SummaryCards: React.FC = () => {
  const { dashboard } = useDashboardStore();
  const { balance, income, expenses, savings } = dashboard;

  const cards = [
    { title: "Total Balance", value: `$${balance ?? 0}` },
    { title: "Monthly Income", value: `$${income ?? 0}` },
    { title: "Monthly Expense", value: `$${expenses ?? 0}` },
    { title: "Monthly Savings", value: `$${savings ?? 0}` },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <Card key={c.title} title={c.title} value={c.value} />
      ))}
    </div>
  );
};

export default SummaryCards;
