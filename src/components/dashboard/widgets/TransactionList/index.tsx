import type { Transaction } from "utils/dashboardTypes";
import TransactionListHeader from "components/dashboard/widgets/TransactionList/TransactionListHeader";
import TransactionListItem from "components/dashboard/widgets/TransactionList/TransactionListItem";
import TransactionListEmpty from "components/dashboard/widgets/TransactionList/TransactionListEmpty";
import TransactionListSkeleton from "components/dashboard/widgets/TransactionList/TransactionListSkeleton";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete?: (id: string) => void;
  loading?: boolean;
  maxItems?: number;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDelete,
  loading = false,
  maxItems,
}) => {
  const displayTransactions = maxItems
    ? transactions.slice(0, maxItems)
    : transactions;

  if (loading) {
    return <TransactionListSkeleton />;
  }

  if (displayTransactions.length === 0) {
    return <TransactionListEmpty />;
  }

  return (
    <div className="overflow-x-auto">
      <TransactionListHeader />
      <div className="divide-y divide-gray-100">
        {displayTransactions.map((transaction) => (
          <TransactionListItem
            key={transaction.id}
            transaction={transaction}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
