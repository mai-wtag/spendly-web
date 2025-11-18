import { SlidersHorizontal } from "lucide-react";

interface FilterButtonProps {
  activeCount: number;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ activeCount, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors relative"
    >
      <SlidersHorizontal size={18} className="text-gray-600" />
      <span className="text-sm font-medium text-gray-700">Filters</span>
      {activeCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal-400 text-white text-xs font-bold rounded-full flex items-center justify-center">
          {activeCount}
        </span>
      )}
    </button>
  );
};

export default FilterButton;
