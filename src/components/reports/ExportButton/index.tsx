import { useState } from "react";
import { Download, FileSpreadsheet } from "lucide-react";
import { exportToExcel } from "utils/helpers";
import type { Transaction } from "utils/dashboardTypes";
import toast from "react-hot-toast";

interface ExportButtonProps {
  transactions: Transaction[];
  startDate: string;
  endDate: string;
  disabled?: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  transactions,
  startDate,
  endDate,
  disabled,
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    if (transactions.length === 0) {
      toast.error("No transactions to export");

      return;
    }

    setIsExporting(true);

    try {
      exportToExcel(transactions, startDate, endDate);
      toast.success("Exported successfully!");
    } catch (error) {
      toast.error(`Export failed ${String(error)}`);
    } finally {
      setTimeout(() => setIsExporting(false), 1000);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={disabled || isExporting}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isExporting ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-600"></div>
          <span className="text-sm font-medium">Exporting...</span>
        </>
      ) : (
        <>
          <Download size={16} className="text-gray-600" />
          <FileSpreadsheet size={16} className="text-green-600" />
          <span className="text-sm font-medium">Export to Excel</span>
        </>
      )}
    </button>
  );
};

export default ExportButton;
