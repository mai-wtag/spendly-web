import React from "react";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-display">
      <Header title="Spendly" />
      <main className="flex-grow flex items-center justify-center p-4">
        <LoginForm />
      </main>
    </div>
  );
};

export default LoginPage;
