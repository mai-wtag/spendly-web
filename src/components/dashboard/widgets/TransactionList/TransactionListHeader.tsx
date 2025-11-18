const TransactionListHeader: React.FC = () => {
  return (
    <div className="flex gap-4 px-4 py-3 bg-gray-50 rounded-t-lg border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider justify-between">
      <span>Activity</span>
      <span>Date</span>
      <span>Amount</span>
    </div>
  );
};

export default TransactionListHeader;
