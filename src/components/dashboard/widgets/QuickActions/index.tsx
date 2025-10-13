import { useNavigate } from "react-router";
import { BarChart3, PlusCircle, Trophy } from "lucide-react";
import Button from "components/base-components/Button";
import { ROUTES } from "routes/paths";

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      <Button
        variant="primary"
        size="md"
        onClick={() => navigate(ROUTES.TRANSACTIONS)}
        text="Add Transaction"
        icon={<PlusCircle size={18} />}
        iconPosition="left"
        fullWidth
      />
      <Button
        variant="secondary"
        size="md"
        onClick={() => navigate(ROUTES.BUDGET_GOALS)}
        text="Set Goal"
        icon={<Trophy size={18} />}
        iconPosition="left"
        fullWidth
      />
      <Button
        variant="outline"
        size="md"
        onClick={() => navigate(ROUTES.REPORTS)}
        text="View Reports"
        icon={<BarChart3 size={18} />}
        iconPosition="left"
        fullWidth
      />
    </div>
  );
};

export default QuickActions;
