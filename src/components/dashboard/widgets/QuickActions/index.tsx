import { useNavigate } from "react-router";
import { BarChart3, PlusCircle, Trophy } from "lucide-react";
import Button from "components/base-components/Button";
import { ROUTES } from "routes/paths";

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const handleAddTransaction = () => {
    navigate(ROUTES.TRANSACTIONS);
  };

  const handleSetGoal = () => {
    navigate(ROUTES.BUDGET_GOALS);
  };

  const handleViewReports = () => {
    navigate(ROUTES.REPORTS);
  };

  return (
    <div className="flex flex-col gap-3">
      <Button
        variant="primary"
        size="md"
        onClick={handleAddTransaction}
        text="Add Transaction"
        icon={<PlusCircle size={18} />}
        iconPosition="left"
        fullWidth
      />
      <Button
        variant="secondary"
        size="md"
        onClick={handleSetGoal}
        text="Set Goal"
        icon={<Trophy size={18} />}
        iconPosition="left"
        fullWidth
      />
      <Button
        variant="outline"
        size="md"
        onClick={handleViewReports}
        text="View Reports"
        icon={<BarChart3 size={18} />}
        iconPosition="left"
        fullWidth
      />
    </div>
  );
};

export default QuickActions;
