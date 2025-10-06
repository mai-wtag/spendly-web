import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "store";
import type { FormField } from "components/auth/FormTypes"; 
import FormPanel from "components/auth/FormPanel";
import AuthLayout from "components/auth/AuthLayout";
import { login } from "actions/authActions";
import { useLocalStorageStore } from "hooks/useLocalStorageStore";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const [showSuccess, setShowSuccess] = useState(false);


  const [storedAuth] = useLocalStorageStore("auth", { isAuthenticated: false, user: null });

  const fields: FormField[] = [
    { id: "email", name: "email", placeholder: "Email or Username", required: true, validations: [{ type: "email" }] },
    { id: "password", name: "password", type: "password", placeholder: "Password", required: true, validations: [{ type: "minLength", value: 6 }] },
  ];

  const handleSubmit = (values: Record<string, string>) => {
    dispatch(login(values.email, values.password));
  };

  useEffect(() => {
    if ((auth.isAuthenticated && !auth.error) || storedAuth.isAuthenticated) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        navigate("/dashboard");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [auth.isAuthenticated, auth.error, storedAuth, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 relative">
      <AuthLayout
        title="Welcome Back"
        subtitle="Log in to manage your finances."
        footerText="Don't have an account?"
        footerLinkText="Sign up"
        footerLinkHref="/signup"
      >
        <FormPanel fields={fields} submitText={auth.loading ? "Logging in..." : "Login"} onSubmit={handleSubmit} />
        {auth.error && <p className="text-red-500 text-sm mt-2">{auth.error}</p>}
        <div className="text-sm mt-2">
          <Link to="/forgot-password" className="font-medium text-teal-400 hover:underline">
            Forgot password?
          </Link>
        </div>
      </AuthLayout>

      {showSuccess && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
          Login successful!
        </div>
      )}
    </div>
  );
};

export default Login;
