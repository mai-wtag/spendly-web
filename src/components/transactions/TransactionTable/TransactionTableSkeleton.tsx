import TransactionTableHeader from "components/transactions/TransactionTable/TransactionTableHeader";

const TransactionTableSkeleton: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      <table className="w-full text-left">
        <TransactionTableHeader />
        <tbody className="divide-y divide-gray-200">
          {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i} className="animate-pulse">
              <td className="p-4">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </td>
              <td className="p-4">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </td>
              <td className="p-4">
                <div className="h-4 bg-gray-200 rounded w-16 ml-auto"></div>
              </td>
              <td className="p-4">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </td>
              <td className="p-4">
                <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTableSkeleton;
