import React from "react";
import Button from "components/base-components/Button";
import { useNavigate } from "react-router-dom";

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      <Button variant="primary" onClick={() => navigate("/transactions")} text="Add Transaction"/>
      <Button variant="secondary" onClick={() => navigate("/budget-goals")} text="Set Goal"/>
      <Button variant="outline" onClick={() => navigate("/reports")} text="View Reports"/>
    </div>
  );
};

export default QuickActions;
