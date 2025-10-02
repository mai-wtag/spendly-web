import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "store";
import { forgotPassword } from "actions/authActions";
import FormPanel from "components/auth/FormPanel";
import AuthLayout from "components/auth/AuthLayout";
import type { FormField } from "components/auth/FormTypes";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const [showSuccess, setShowSuccess] = useState(false);

  const fields: FormField[] = [
    { id: "email", name: "email", type: "email", placeholder: "Enter your email", required: true, validations: [{ type: "email" }] },
  ];

  const handleSubmit = (values: Record<string, string>) => {
    dispatch(forgotPassword(values.email));
  };

  useEffect(() => {
    if (!auth.loading && auth.forgotEmail) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        navigate("/reset-password");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [auth.loading, auth.forgotEmail, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 relative">
      <AuthLayout
        title="Forgot Password?"
        subtitle="No worries, we'll send you reset instructions."
        footerText="Back to Log In"
        footerLinkText="Back to Log In"
        footerLinkHref="/"
      >
        <FormPanel fields={fields} submitText={auth.loading ? "Sending..." : "Reset Password"} onSubmit={handleSubmit} />
        {auth.error && <p className="text-red-500 text-sm mt-2">{auth.error}</p>}
      </AuthLayout>

      {showSuccess && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
          Reset instructions sent!
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
