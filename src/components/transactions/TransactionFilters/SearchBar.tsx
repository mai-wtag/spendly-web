import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search transactions...",
}) => {
  return (
    <div className="relative flex-1 max-w-md">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all"
        placeholder={placeholder}
      />
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
};

export default SearchBar;
