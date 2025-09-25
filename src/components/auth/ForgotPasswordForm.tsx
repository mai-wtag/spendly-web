import React from "react";
import { useNavigate } from "react-router-dom";
import FormPanel from "components/auth/FormPanel";
import type { FormField } from "components/auth/FormTypes";


const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();

  const fields: FormField[] = [
    { id: "email", name: "email", type: "email", placeholder: "Enter your email", required: true },
  ];

  const handleSubmit = (values: Record<string, string>) => {
    console.log("Forgot password:", values);
    navigate("/set-password");
  };

  return <FormPanel fields={fields} submitText="Reset Password" onSubmit={handleSubmit} />;
};

export default ForgotPasswordForm;
