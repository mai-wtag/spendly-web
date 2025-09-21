import React from "react";
import Header from "components/layout/Header";
import LoginForm from "components/LoginForm";
import Button from "components/base-components/Button";

const LoginPage: React.FC = () => {
  const signupButton = (
    <Button className="px-6 py-2 rounded-lg text-sm font-semibold bg-teal-100 text-teal-400 hover:bg-teal-200 hover:text-teal-600 transition-colors">
      Sign Up
    </Button>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-display">
      <Header title="Spendly" action={signupButton} />
      <main className="flex-grow flex items-center justify-center p-4">
        <LoginForm />
      </main>
    </div>
  );
};

export default LoginPage;
