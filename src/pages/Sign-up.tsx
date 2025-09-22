import React from "react";
import AuthLayout from "components/auth/AuthLayout";
import SignupForm from "components/auth/SignupForm";

const SignupPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 font-display  w-full justify-center items-center">
        <AuthLayout
          title="Create your Spendly account"
          subtitle="Join us to manage your finances."
          footerText="Already have an account?"
          footerLinkText="Sign in"
          footerLinkHref="/"
        >
          <SignupForm />
        </AuthLayout>
    </div>
  );
};

export default SignupPage;
