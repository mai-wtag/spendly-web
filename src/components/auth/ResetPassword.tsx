import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "store";
import { resetPassword } from "actions/authActions";
import FormPanel from "components/auth/FormPanel";
import AuthLayout from "components/auth/AuthLayout";
import type { FormField } from "components/auth/FormTypes";

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  const [showSuccess, setShowSuccess] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const formObj: {
    title: string;
    description: string;
    submitText: string;
    redirectLink: { text: string; to: string };
    fields: FormField[];
  } = {
    title: "Set New Password",
    description:
      "Enter a strong password and confirm it to update your account.",
    submitText: auth.loading ? "Updating..." : "Update Password",
    redirectLink: { text: "Back to Log In", to: "/" },
    fields: [
      {
        id: "password",
        name: "password",
        type: "password",
        placeholder: "Enter new password",
        required: true,
      },
      {
        id: "confirmPassword",
        name: "confirmPassword",
        type: "password",
        placeholder: "Confirm new password",
        required: true,
      },
    ],
  };

  const handleSubmit = (values: Record<string, string>) => {
    if (values.password !== values.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    setLocalError(null);
    dispatch(resetPassword(values.password));
  };

  useEffect(() => {
    if (!auth.loading && !auth.error && !auth.forgotEmail) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        navigate("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [auth.loading, auth.error, auth.forgotEmail, navigate]);

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

        {localError && (
          <p className="text-red-500 text-sm mt-2">{localError}</p>
        )}
        {auth.error && (
          <p className="text-red-500 text-sm mt-2">{auth.error}</p>
        )}
      </AuthLayout>

      {showSuccess && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
          Password updated successfully!
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
