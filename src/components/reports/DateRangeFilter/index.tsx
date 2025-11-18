import { Calendar, Filter } from "lucide-react";

interface DateRangeFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onApplyFilter: () => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onApplyFilter,
}) => {
  return (
    <div className="flex flex-wrap items-end gap-3 bg-white border border-gray-200 rounded-lg shadow-sm px-4 py-3">
      <div className="flex-1 min-w-[140px]">
        <label className="block text-xs font-medium text-gray-600 mb-1.5">
          Start Date
        </label>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-400 flex-shrink-0" />
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            max={endDate || new Date().toISOString().split("T")[0]}
            className="flex-1 bg-transparent border-0 p-0 text-sm focus:ring-0 focus:outline-none"
          />
        </div>
      </div>

      <div className="hidden sm:block h-10 border-l border-gray-200"></div>

      <div className="flex-1 min-w-[140px]">
        <label className="block text-xs font-medium text-gray-600 mb-1.5">
          End Date
        </label>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-400 flex-shrink-0" />
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            min={startDate}
            max={new Date().toISOString().split("T")[0]}
            className="flex-1 bg-transparent border-0 p-0 text-sm focus:ring-0 focus:outline-none"
          />
        </div>
      </div>

      <button
        onClick={onApplyFilter}
        className="px-5 py-2 bg-teal-400 text-white rounded-lg hover:bg-teal-500 transition-colors flex items-center justify-center gap-2 font-medium shadow-sm"
      >
        <Filter size={16} />
        <span className="text-sm">Apply</span>
      </button>
    </div>
  );
};

export default DateRangeFilter;
