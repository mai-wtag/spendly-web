interface StatCardProps {
  title: string;
  value: number;
  format?: "currency" | "number";
  icon?: React.ReactNode;
  loading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  format = "currency",
  icon,
  loading = false,
}) => {
  const formattedValue =
    format === "currency"
      ? `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : value.toLocaleString();

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{formattedValue}</p>
        </div>
        {icon && (
          <div className="flex-shrink-0 p-3 bg-teal-50 rounded-lg text-teal-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
