import React from "react";
import { useNavigate } from "react-router-dom";
import FormPanel from "components/auth/FormPanel";
import AuthLayout from "components/auth/AuthLayout";
import type { FormField } from "components/auth/FormTypes";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  const formObj: {
    title: string;
    description: string;
    submitText: string;
    redirectLink: { text: string; to: string };
    fields: FormField[];
  } = {
    title: "Forgot Password?",
    description: "No worries, we'll send you reset instructions.",
    submitText: "Reset Password",
    redirectLink: { text: "Back to Log In", to: "/" },
    fields: [
      {
        id: "email",
        name: "email",
        type: "email",
        placeholder: "Enter your email",
        required: true,
      },
    ],
  };

  const handleSubmit = (values: Record<string, string>) => {
    console.log("Forgot password values:", values);
    navigate("/reset-password");
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

export default ForgotPassword;
