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

  const fields: FormField[] = [
    { id: "password", name: "password", type: "password", placeholder: "Enter new password", required: true, validations: [{ type: "minLength", value: 6 }] },
    { id: "confirmPassword", name: "confirmPassword", type: "password", placeholder: "Confirm new password", required: true, validations: [{ type: "match", value: "password", message: "Passwords do not match" }] },
  ];

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
        title="Set New Password"
        subtitle="Enter a strong password and confirm it to update your account."
        footerText="Back to Log In"
        footerLinkText="Back to Log In"
        footerLinkHref="/"
      >
        <FormPanel fields={fields} submitText={auth.loading ? "Updating..." : "Update Password"} onSubmit={handleSubmit} />
        {localError && <p className="text-red-500 text-sm mt-2">{localError}</p>}
        {auth.error && <p className="text-red-500 text-sm mt-2">{auth.error}</p>}
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
