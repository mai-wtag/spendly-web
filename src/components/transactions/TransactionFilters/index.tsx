import type { TransactionType } from "utils/dashboardTypes";
import { useTransactionFilters } from "components/transactions/TransactionFilters/useTransactionFilters";
import SearchBar from "components/transactions/TransactionFilters/SearchBar";
import FilterButton from "components/transactions/TransactionFilters/FilterButton";
import FilterPanel from "components/transactions/TransactionFilters/FilterPanel";

interface TransactionFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedType: TransactionType | "all";
  onTypeChange: (type: TransactionType | "all") => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedCategory,
  onCategoryChange,
}) => {
  const { showFilters, toggleFilters, closeFilters } = useTransactionFilters();

  const handleReset = () => {
    onSearchChange("");
    onTypeChange("all");
    onCategoryChange("");
    closeFilters();
  };

  const activeFiltersCount =
    (selectedType !== "all" ? 1 : 0) + (selectedCategory ? 1 : 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
        <FilterButton activeCount={activeFiltersCount} onClick={toggleFilters} />
      </div>

      {showFilters && (
        <FilterPanel
          selectedType={selectedType}
          onTypeChange={onTypeChange}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          onReset={handleReset}
          onClose={closeFilters}
        />
      )}
    </div>
  );
};

export default TransactionFilters;
