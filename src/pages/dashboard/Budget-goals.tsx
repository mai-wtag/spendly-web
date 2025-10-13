import PageHeader from "components/dashboard/common/PageHeader";
import PlaceholderContent from "components/dashboard/common/PlaceholderContent";

const BudgetGoals: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Budget & Goals"
        description="Set and track your financial goals"
      />
      <PlaceholderContent message="Budget planning and goal tracking features will be added here" />
    </div>
  );
};

export default BudgetGoals;
