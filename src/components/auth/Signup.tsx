import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "store";
import FormPanel from "components/auth/FormPanel";
import AuthLayout from "components/auth/AuthLayout";
import type { FormField } from "components/auth/FormTypes";
import { signup } from "actions/authActions";

const Signup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const [showSuccess, setShowSuccess] = useState(false);

  const fields: FormField[] = [
    { id: "full-name", name: "fullName", placeholder: "Full Name", required: true },
    { id: "email", name: "email", placeholder: "Email Address", required: true, validations: [{ type: "email" }] },
    { id: "password", name: "password", type: "password", placeholder: "Password", required: true, validations: [{ type: "minLength", value: 6 }] },
    { id: "confirm-password", name: "confirmPassword", type: "password", placeholder: "Confirm Password", required: true, validations: [{ type: "match", value: "password", message: "Passwords do not match" }] },
  ];

  const handleSubmit = (values: Record<string, string>) => {
    dispatch(signup(values.fullName, values.email, values.password));
  };

  useEffect(() => {
    if (!auth.loading && !auth.error && auth.user) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        navigate("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [auth.loading, auth.error, auth.user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 relative">
      <AuthLayout
        title="Create your Spendly account"
        subtitle="Join us to manage your finances."
        footerText="Already have an account?"
        footerLinkText="Sign in"
        footerLinkHref="/"
      >
        <FormPanel fields={fields} submitText={auth.loading ? "Creating..." : "Create Account"} onSubmit={handleSubmit} />
        {auth.error && <p className="text-red-500 text-sm mt-2">{auth.error}</p>}
      </AuthLayout>

      {showSuccess && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
          Account created successfully!
        </div>
      )}
    </div>
  );
};

export default Signup;
