import React from "react";
import { Link } from "react-router-dom";
import type { FormField } from "components/auth/FormTypes"; 
import FormPanel from "components/auth/FormPanel";


const LoginForm: React.FC = () => {
  const fields: FormField[] = [
    { id: "email", name: "email", placeholder: "Email or Username", required: true },
    { id: "password", name: "password", type: "password", placeholder: "Password", required: true },
  ];

  const handleSubmit = (values: Record<string, string>) => {
    console.log("Login values:", values);
  };

  return (
    <>
      <FormPanel fields={fields} submitText="Login" onSubmit={handleSubmit} />
      <div className="text-sm mt-2">
        <Link to="/forgot-password" className="font-medium text-teal-400 hover:underline">
          Forgot password?
        </Link>
      </div>
    </>
  );
};

export default LoginForm;
