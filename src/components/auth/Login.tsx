import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "store";
import type { FormField } from "components/auth/FormTypes"; 
import FormPanel from "components/auth/FormPanel";
import AuthLayout from "components/auth/AuthLayout";
import { login } from "actions/authActions";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const [showSuccess, setShowSuccess] = useState(false);

  const formObj: {
    title: string;
    description: string;
    submitText: string;
    redirectLink: { text: string; to: string };
    fields: FormField[];
  } = {
    title: "Welcome Back",
    description: "Log in to manage your finances.",
    submitText: "Login",
    redirectLink: { text: "Don't have an account?", to: "/signup" },
    fields: [
      { id: "email", name: "email", type: "email", placeholder: "Email or Username", required: true },
      { id: "password", name: "password", type: "password", placeholder: "Password", required: true },
    ],
  };

  const handleSubmit = (values: Record<string, string>) => {
    dispatch(login(values.email, values.password));
  };

  useEffect(() => {
    if (auth.isAuthenticated && !auth.error) {
      setShowSuccess(true);

      const timer = setTimeout(() => {
        setShowSuccess(false);
        navigate("/dashboard");
      }, 2000); 

      return () => clearTimeout(timer);
    }
  }, [auth.isAuthenticated, auth.error, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 relative">
      <AuthLayout
        title={formObj.title}
        subtitle={formObj.description}
        footerText={formObj.redirectLink.text}
        footerLinkText="Sign up"
        footerLinkHref={formObj.redirectLink.to}
      >
        <FormPanel
          fields={formObj.fields}
          submitText={auth.loading ? "Logging in..." : formObj.submitText}
          onSubmit={handleSubmit}
        />

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
