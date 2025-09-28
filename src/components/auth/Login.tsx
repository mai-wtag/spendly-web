import React from "react";
import { Link } from "react-router-dom";
import type { FormField } from "components/auth/FormTypes"; 
import FormPanel from "components/auth/FormPanel";
import AuthLayout from "components/auth/AuthLayout";

const Login: React.FC = () => {
  const formObj: {
    title: string;
    description: string;
    submitText: string;
    redirectLink: { text: string; to: string };
    fields: FormField[];
  } = {
    title: "Welcome Back",
    description: "Log in to manage your finances.",
    submitText: "Login",
    redirectLink: { text: "Don't have an account?", to: "/signup" },
    fields: [
      { id: "email", name: "email", type: "email", placeholder: "Email or Username", required: true },
      { id: "password", name: "password", type: "password", placeholder: "Password", required: true },
    ],
  };

  const handleSubmit = (values: Record<string, string>) => {
    console.log("Login values:", values);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <AuthLayout
        title={formObj.title}
        subtitle={formObj.description}
        footerText={formObj.redirectLink.text}
        footerLinkText="Sign up"
        footerLinkHref={formObj.redirectLink.to}
      >
        <FormPanel
          fields={formObj.fields}
          submitText={formObj.submitText}
          onSubmit={handleSubmit}
        />
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
