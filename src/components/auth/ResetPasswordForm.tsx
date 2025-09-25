import React, { useState } from "react";
import FormPanel from "components/auth/FormPanel";
import type { FormField } from "components/auth/FormTypes";


const ResetPasswordForm: React.FC = () => {
  const [error, setError] = useState("");

  const fields: FormField[] = [
    { id: "password", name: "password", type: "password", placeholder: "Enter new password", required: true },
    { id: "confirmPassword", name: "confirmPassword", type: "password", placeholder: "Confirm new password", required: true },
  ];

  const handleSubmit = (values: Record<string, string>) => {
    if (values.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    console.log("Password updated:", values.password);
  };

  return <FormPanel fields={fields} submitText="Update Password" onSubmit={handleSubmit} error={error} />;
};

export default ResetPasswordForm;
