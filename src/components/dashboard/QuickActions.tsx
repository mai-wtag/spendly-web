import React from "react";
import Button from "components/base-components/Button";
import { useNavigate } from "react-router-dom";
import { ChartBar, PlusCircle, Trophy } from "lucide-react";

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      <Button variant="primary" onClick={() => navigate("/transactions")} icon={<PlusCircle/>} text="Add Transaction"/>
      <Button variant="secondary" onClick={() => navigate("/budget-goals")} icon={<Trophy/>} text="Set Goal"/>
      <Button variant="secondary" onClick={() => navigate("/reports")} icon={<ChartBar/>} text="View Reports"/>
    </div>
  );
};

export default QuickActions;
