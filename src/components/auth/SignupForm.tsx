import React from "react";
import FormPanel from "components/auth/FormPanel";
import type { FormField } from "components/auth/FormTypes";

const SignupForm: React.FC = () => {
  const fields: FormField[] = [
    { id: "full-name", name: "fullName", placeholder: "Full Name", required: true },
    { id: "email", name: "email", type: "email", placeholder: "Email Address", required: true },
    { id: "password", name: "password", type: "password", placeholder: "Password", required: true },
    { id: "confirm-password", name: "confirmPassword", type: "password", placeholder: "Confirm Password", required: true },
  ];

  const handleSubmit = (values: Record<string, string>) => {
    console.log("Signup values:", values);
  };

  return <FormPanel fields={fields} submitText="Create Account" onSubmit={handleSubmit} />;
};

export default SignupForm;
