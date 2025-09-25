import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "components/base-components/Input";
import Button from "components/base-components/Button";

const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    navigate("/set-password");
  };

  return (
    <div className="w-full space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
        />
        <Button type="submit" text="Reset Password" />
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
