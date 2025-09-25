import React from "react";
import AuthLayout from "components/auth/AuthLayout";
import ResetPasswordForm from "components/auth/ResetPasswordForm";

const ResetPassword: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 font-display w-full justify-center items-center">
      <AuthLayout
        title="Set New Password"
        subtitle="Enter a strong password and confirm it to update your account."
        footerText=""
        footerLinkText="Back to Log In"
        footerLinkHref="/"
      >
        <ResetPasswordForm />
      </AuthLayout>
    </div>
  );
};

export default ResetPassword;
