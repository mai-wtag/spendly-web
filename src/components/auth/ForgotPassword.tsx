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

  const formObj: {
    title: string;
    description: string;
    submitText: string;
    redirectLink: { text: string; to: string };
    fields: FormField[];
  } = {
    title: "Forgot Password?",
    description: "No worries, we'll send you reset instructions.",
    submitText: auth.loading ? "Sending..." : "Reset Password",
    redirectLink: { text: "Back to Log In", to: "/" },
    fields: [
      {
        id: "email",
        name: "email",
        type: "email",
        placeholder: "Enter your email",
        required: true,
      },
    ],
  };

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
        title={formObj.title}
        subtitle={formObj.description}
        footerText={formObj.redirectLink.text}
        footerLinkText="Back to Log In"
        footerLinkHref={formObj.redirectLink.to}
      >
        <FormPanel
          fields={formObj.fields}
          submitText={formObj.submitText}
          onSubmit={handleSubmit}
        />

        {auth.error && (
          <p className="text-red-500 text-sm mt-2">{auth.error}</p>
        )}
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
