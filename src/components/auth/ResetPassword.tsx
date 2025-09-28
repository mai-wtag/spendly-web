import React from "react";
import { useNavigate } from "react-router-dom";
import FormPanel from "components/auth/FormPanel";
import AuthLayout from "components/auth/AuthLayout";
import type { FormField } from "components/auth/FormTypes";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  const formObj: {
    title: string;
    description: string;
    submitText: string;
    redirectLink: { text: string; to: string };
    fields: FormField[];
  } = {
    title: "Set New Password",
    description: "Enter a strong password and confirm it to update your account.",
    submitText: "Update Password",
    redirectLink: { text: "Back to Log In", to: "/" },
    fields: [
      { id: "password", name: "password", type: "password", placeholder: "Enter new password", required: true },
      { id: "confirmPassword", name: "confirmPassword", type: "password", placeholder: "Confirm new password", required: true },
    ],
  };

  const handleSubmit = (values: Record<string, string>) => {
    console.log("Reset password values:", values);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <AuthLayout
        title={formObj.title}
        subtitle={formObj.description}
        footerText={formObj.redirectLink.text}
        footerLinkText="Back to Log In"
        footerLinkHref={formObj.redirectLink.to}
      >
        <FormPanel
          fields={formObj.fields}
          submitText={formObj.submitText}
          onSubmit={handleSubmit}
        />
      </AuthLayout>
    </div>
  );
};

export default ResetPassword;
