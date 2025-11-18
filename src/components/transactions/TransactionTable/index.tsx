import type { Transaction } from "utils/dashboardTypes";
import TransactionTableHeader from "components/transactions/TransactionTable/TransactionTableHeader";
import TransactionTableRow from "components/transactions/TransactionTable/TransactionTableRow";
import TransactionTableEmpty from "components/transactions/TransactionTable/TransactionTableEmpty";
import TransactionTableSkeleton from "components/transactions/TransactionTable/TransactionTableSkeleton";

interface TransactionTableProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onEdit,
  onDelete,
  loading,
}) => {
  if (loading) {
    return <TransactionTableSkeleton />;
  }

  if (transactions.length === 0) {
    return <TransactionTableEmpty />;
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <table className="w-full text-left">
        <TransactionTableHeader />
        <tbody className="divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <TransactionTableRow
              key={transaction.id}
              transaction={transaction}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
