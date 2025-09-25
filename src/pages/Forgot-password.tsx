import React from "react";
import ForgotPasswordForm from "components/auth/ForgotPasswordForm";
import AuthLayout from "components/auth/AuthLayout";

const ForgotPassword: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 font-display  w-full justify-center items-center">
            <AuthLayout
              title="Forgot Password?"
              subtitle="No worries, we'll send you reset instructions."
              footerText=""
              footerLinkText="Back to Log In"
              footerLinkHref="/"
            >
              <ForgotPasswordForm/>
            </AuthLayout>
        </div>
  );
};

export default ForgotPassword;
