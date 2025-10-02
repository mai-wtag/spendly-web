import React from "react";
import { useNavigate } from "react-router-dom";
import FormPanel from "components/auth/FormPanel";
import AuthLayout from "components/auth/AuthLayout";
import type { FormField } from "components/auth/FormTypes";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  const fields: FormField[] = [
    { id: "password", name: "password", type: "password", placeholder: "Enter new password", required: true, validations: [{ type: "minLength", value: 6 }] },
    { id: "confirmPassword", name: "confirmPassword", type: "password", placeholder: "Confirm new password", required: true, validations: [{ type: "match", value: "password", message: "Passwords do not match" }] },
  ];

  const handleSubmit = (values: Record<string, string>) => {
    console.log("Reset password values:", values);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <AuthLayout
        title="Set New Password"
        subtitle="Enter a strong password and confirm it to update your account."
        footerText="Back to Log In"
        footerLinkText="Back to Log In"
        footerLinkHref="/"
      >
        <FormPanel fields={fields} submitText="Update Password" onSubmit={handleSubmit} />
      </AuthLayout>
    </div>
  );
};

export default ResetPassword;
