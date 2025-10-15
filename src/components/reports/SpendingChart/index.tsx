import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingDown } from "lucide-react";

interface CategoryData {
  category: string;
  amount: number;
  percentage: number;
}

interface SpendingChartProps {
  data: CategoryData[];
  loading?: boolean;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number;
    payload?: {
      name: string;
      value: number;
    };
  }>;
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

const SpendingChart: React.FC<SpendingChartProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="w-full h-80 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-1">Spending by Category</h3>
        <p className="text-sm text-gray-500 mb-4">Selected Date Range</p>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <TrendingDown size={32} className="text-gray-400" />
          </div>
          <p className="text-sm text-gray-500">
            No expense data for selected period
          </p>
        </div>
      </div>
    );
  }

  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);

  const chartData = data.map((item) => ({
    name: item.category,
    value: item.amount,
  }));

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length > 0) {
      const item = payload[0];
      const value = item.value || 0;
      const name = item.name || "";

      return (
        <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm">
          <p className="font-semibold">{name}</p>
          <p>${value.toFixed(2)}</p>
          <p className="text-xs text-gray-300">
            {((value / totalAmount) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-1">Spending by Category</h3>
      <p className="text-sm text-gray-500 mb-6">
        Total: ${totalAmount.toFixed(2)}
      </p>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            label
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;
