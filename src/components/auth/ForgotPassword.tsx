import React from "react";
import { useNavigate } from "react-router-dom";
import FormPanel from "components/auth/FormPanel";
import AuthLayout from "components/auth/AuthLayout";
import type { FormField } from "components/auth/FormTypes";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  const fields: FormField[] = [
    { id: "email", name: "email", type: "email", placeholder: "Enter your email", required: true, validations: [{ type: "email" }] },
  ];

  const handleSubmit = (values: Record<string, string>) => {
    console.log("Forgot password values:", values);
    navigate("/reset-password");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <AuthLayout
        title="Forgot Password?"
        subtitle="No worries, we'll send you reset instructions."
        footerText="Back to Log In"
        footerLinkText="Back to Log In"
        footerLinkHref="/"
      >
        <FormPanel fields={fields} submitText="Reset Password" onSubmit={handleSubmit} />
      </AuthLayout>
    </div>
  );
};

export default ForgotPassword;
