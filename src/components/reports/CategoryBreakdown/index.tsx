import { TrendingDown } from "lucide-react";

interface CategoryData {
  category: string;
  amount: number;
  percentage: number;
}

interface CategoryBreakdownProps {
  data: CategoryData[];
  loading?: boolean;
}

const COLORS = [
  "#2dd4bf",
  "#ef4444",
  "#f59e0b",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#10b981",
  "#6b7280",
];

const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({
  data,
  loading,
}) => {
  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Top Categories</h3>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <TrendingDown size={32} className="text-gray-400" />
          </div>
          <p className="text-sm text-gray-500">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-6">Top Categories</h3>
      <div className="space-y-5">
        {data.slice(0, 5).map((item, index) => (
          <div key={item.category} className="group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="font-medium text-gray-800">{item.category}</span>
              </div>
              <span className="text-gray-900 font-semibold">
                ${item.amount.toFixed(2)}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1 ml-6">
              <div
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: COLORS[index % COLORS.length],
                }}
              ></div>
            </div>
          </div>
        ))}

        {data.length > 5 && (
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              +{data.length - 5} more {data.length - 5 === 1 ? "category" : "categories"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryBreakdown;
