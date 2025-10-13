import PageHeader from "components/dashboard/common/PageHeader";
import PlaceholderContent from "components/dashboard/common/PlaceholderContent";

const Transactions: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Transactions"
        description="Manage all your income and expenses"
      />
      <PlaceholderContent message="Transaction management with CRUD functionality will be added here" />
    </div>
  );
};

export default Transactions;
