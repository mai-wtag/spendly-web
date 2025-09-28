import React from "react";
import { Link } from "react-router-dom";
import FormPanel from "components/auth/FormPanel";
import AuthLayout from "components/auth/AuthLayout";
import type { FormField } from "components/auth/FormTypes";

const SignupForm: React.FC = () => {
  const formObj: {
    title: string;
    description: string;
    submitText: string;
    redirectLink: { text: string; to: string };
    fields: FormField[];
  } = {
    title: "Create your Spendly account",
    description: "Join us to manage your finances.",
    submitText: "Create Account",
    redirectLink: { text: "Already have an account?", to: "/" },
    fields: [
      { id: "full-name", name: "fullName", placeholder: "Full Name", required: true },
      { id: "email", name: "email", type: "email", placeholder: "Email Address", required: true },
      { id: "password", name: "password", type: "password", placeholder: "Password", required: true },
      { id: "confirm-password", name: "confirmPassword", type: "password", placeholder: "Confirm Password", required: true },
    ],
  };

  const handleSubmit = (values: Record<string, string>) => {
    console.log("Signup values:", values);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <AuthLayout
        title={formObj.title}
        subtitle={formObj.description}
        footerText={formObj.redirectLink.text}
        footerLinkText="Sign in"
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

export default SignupForm;
