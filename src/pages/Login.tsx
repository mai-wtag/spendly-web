import React from "react";
import AuthLayout from "components/auth/AuthLayout";
import LoginForm from "components/auth/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 font-display w-full justify-center items-center">
        <AuthLayout
          title="Welcome Back"
          subtitle="Log in to manage your finances."
          footerText="Don't have an account?"
          footerLinkText="Sign up"
          footerLinkHref="/signup"
        >
          <LoginForm />
        </AuthLayout>
    </div>
  );
};

export default LoginPage;
