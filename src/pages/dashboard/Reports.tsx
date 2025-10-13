import PageHeader from "components/dashboard/common/PageHeader";
import PlaceholderContent from "components/dashboard/common/PlaceholderContent";

const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Analyze your financial data"
      />
      <PlaceholderContent message="Financial reports with charts and export functionality will be added here" />
    </div>
  );
};

export default Reports;
