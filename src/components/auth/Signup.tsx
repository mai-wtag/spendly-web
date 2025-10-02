import React from "react";
import { Link } from "react-router-dom";
import FormPanel from "components/auth/FormPanel";
import AuthLayout from "components/auth/AuthLayout";
import type { FormField } from "components/auth/FormTypes";

const Signup: React.FC = () => {
  const fields: FormField[] = [
    { id: "full-name", name: "fullName", placeholder: "Full Name", required: true },
    { id: "email", name: "email", placeholder: "Email Address", required: true, validations: [{ type: "email" }] },
    { id: "password", name: "password", type: "password", placeholder: "Password", required: true, validations: [{ type: "minLength", value: 6 }] },
    { id: "confirm-password", name: "confirmPassword", type: "password", placeholder: "Confirm Password", required: true, validations: [{ type: "match", value: "password", message: "Passwords do not match" }] },
  ];

  const handleSubmit = (values: Record<string, string>) => {
    console.log("Signup values:", values);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <AuthLayout
        title="Create your Spendly account"
        subtitle="Join us to manage your finances."
        footerText="Already have an account?"
        footerLinkText="Sign in"
        footerLinkHref="/"
      >
        <FormPanel fields={fields} submitText="Create Account" onSubmit={handleSubmit} />
      </AuthLayout>
    </div>
  );
};

export default Signup;
