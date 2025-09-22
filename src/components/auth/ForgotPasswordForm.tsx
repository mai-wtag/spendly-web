import React from "react";
import Input from "components/base-components/Input";
import Button from "components/base-components/Button";

const ForgotPasswordForm: React.FC = () => {
  return (
    <div className="w-full space-y-8">
      <form className="space-y-6">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
        />
        <Button
          type="submit" text="Reset Password"
        />
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
