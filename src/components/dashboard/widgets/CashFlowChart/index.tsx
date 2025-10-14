import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { CashFlowData } from "utils/dashboardTypes";

interface CashFlowChartProps {
  data: CashFlowData[];
  loading?: boolean;
}

const CashFlowChart: React.FC<CashFlowChartProps> = ({ data, loading = false }) => {
  if (loading) {
    return (
      <div className="h-48 md:h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-teal-400 mx-auto mb-2"></div>
          <p className="text-xs md:text-sm text-gray-500">Loading chart...</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-48 md:h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
        <p className="text-xs md:text-sm text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="h-48 md:h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="month" 
            tick={{ fill: "#6b7280", fontSize: 11 }}
            stroke="#9ca3af"
          />
          <YAxis 
            tick={{ fill: "#6b7280", fontSize: 11 }}
            stroke="#9ca3af"
            tickFormatter={(value) => `$${value}`}
            width={50}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              fontSize: "12px",
            }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, ""]}
          />
          <Legend 
            wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: "#10b981", r: 3 }}
            activeDot={{ r: 5 }}
            name="Income"
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ fill: "#ef4444", r: 3 }}
            activeDot={{ r: 5 }}
            name="Expense"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CashFlowChart;
