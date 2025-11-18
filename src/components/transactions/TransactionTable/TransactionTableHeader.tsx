const TransactionTableHeader: React.FC = () => {
  return (
    <thead className="sticky top-0 bg-gray-50 z-10">
      <tr>
        <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
          Date
        </th>
        <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
          Category
        </th>
        <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-right">
          Amount
        </th>
        <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
          Note
        </th>
        <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-center">
          Actions
        </th>
      </tr>
    </thead>
  );
};

export default TransactionTableHeader;
