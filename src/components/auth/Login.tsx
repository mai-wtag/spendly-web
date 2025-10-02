import React from "react";
import { Link } from "react-router-dom";
import FormPanel from "components/auth/FormPanel";
import AuthLayout from "components/auth/AuthLayout";
import type { FormField } from "components/auth/FormTypes";

const Login: React.FC = () => {
  const fields: FormField[] = [
    { id: "email", name: "email", placeholder: "Email or Username", required: true, validations: [{ type: "email" }] },
    { id: "password", name: "password", type: "password", placeholder: "Password", required: true, validations: [{ type: "minLength", value: 6 }] },
  ];

  const handleSubmit = (values: Record<string, string>) => {
    console.log("Login values:", values);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <AuthLayout
        title="Welcome Back"
        subtitle="Log in to manage your finances."
        footerText="Don't have an account?"
        footerLinkText="Sign up"
        footerLinkHref="/signup"
      >
        <FormPanel fields={fields} submitText="Login" onSubmit={handleSubmit} />
        <div className="text-sm mt-2">
          <Link to="/forgot-password" className="font-medium text-teal-400 hover:underline">
            Forgot password?
          </Link>
        </div>
      </AuthLayout>
    </div>
  );
};

export default Login;
