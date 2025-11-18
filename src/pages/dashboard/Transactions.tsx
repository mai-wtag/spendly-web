import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "reduxToolkit/store";
import {
  selectTransactions,
  selectLoading,
} from "reduxToolkit/dashboard/dashboardSelectors";
import { loadTransactions, deleteTransaction } from "reduxToolkit/dashboard/dashboardThunks";
import PageHeader from "components/dashboard/common/PageHeader";
import {
  AddTransactionForm,
  TransactionTable,
  TransactionFilters,
  EditTransactionModal,
} from "components/transactions";
import type { Transaction, TransactionType } from "utils/dashboardTypes";

const Transactions: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allTransactions = useSelector(selectTransactions);
  const loading = useSelector(selectLoading);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<TransactionType | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    dispatch(loadTransactions());
  }, [dispatch]);

  const filteredTransactions = useMemo(() => {
    return allTransactions.filter((transaction) => {
      const matchesSearch =
        searchQuery === "" ||
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === "all" || transaction.type === selectedType;

      const matchesCategory =
        selectedCategory === "" || transaction.category === selectedCategory;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [allTransactions, searchQuery, selectedType, selectedCategory]);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      dispatch(deleteTransaction(id));
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <PageHeader
        title="Transactions"
        description="Manage all your income and expenses"
      />

      <div className="flex flex-col lg:flex-row gap-6">
        <AddTransactionForm />

        <section className="flex-1 flex flex-col bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Transactions
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {filteredTransactions.length} transaction
                  {filteredTransactions.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <TransactionFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          <TransactionTable
            transactions={filteredTransactions}
            onEdit={setEditingTransaction}
            onDelete={handleDelete}
            loading={loading}
          />
        </section>
      </div>

      {editingTransaction && (
        <EditTransactionModal
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
        />
      )}
    </div>
  );
};

export default Transactions;
