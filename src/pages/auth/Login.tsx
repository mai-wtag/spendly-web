import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "reduxToolkit/store";
import { login } from "reduxToolkit/auth/authActions";
import { useLocalStorageStore } from "hooks/useLocalStorageStore";
import { ROUTES } from "routes/paths";
import type { AuthFormConfig } from "utils/types";
import AuthFormBuilder from "components/auth/AuthFormBuilder";
import AuthLayout from "components/auth/AuthLayout";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, loading, user } = useSelector((state: RootState) => state.auth);
  const prevLoadingRef = useRef(loading);
  const [authStorage] = useLocalStorageStore<{ isAuthenticated: boolean } | null>("auth", null);

  const formConfig: AuthFormConfig = {
    title: "Welcome Back",
    description: "Log in to manage your finances.",
    submitButtonLabel: "Login",
    redirectLink: { text: "Don't have an account?", to: ROUTES.SIGNUP },
    fields: [
      {
        id: "email",
        name: "email",
        placeholder: "Email or Username",
        required: true,
        validations: [
          { type: "required", message: "Email is required" },
          { type: "email", message: "Invalid email address" },
        ],
      },
      {
        id: "password",
        name: "password",
        type: "password",
        placeholder: "Password",
        required: true,
        validations: [
          { type: "required", message: "Password is required" },
          {
            type: "minLength",
            value: 6,
            message: "Password must be at least 6 characters",
          },
        ],
      },
    ],
  };

  const handleSubmit = (values: Record<string, string>) => {
    dispatch(login(values.email, values.password));
  };

 
  useEffect(() => {
    if (prevLoadingRef.current && !loading && isAuthenticated && user) {
      setTimeout(() => {
        navigate(ROUTES.DASHBOARD, { replace: true });
      }, 500);
    }
    
    if (!loading && authStorage?.isAuthenticated && !isAuthenticated) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
    
    prevLoadingRef.current = loading;
  }, [isAuthenticated, loading, user, authStorage, navigate]);

  return (
    <AuthLayout
      title={formConfig.title}
      subtitle={formConfig.description}
      footerText={formConfig.redirectLink.text}
      footerLinkText="Sign up"
      footerLinkHref={formConfig.redirectLink.to}
    >
      <AuthFormBuilder
        fields={formConfig.fields}
        submitButtonLabel={loading ? "Logging in..." : formConfig.submitButtonLabel}
        onSubmit={handleSubmit}
      />
      <Link
        to={ROUTES.FORGOT_PASSWORD}
        className="text-sm mt-2 block font-medium text-teal-400 hover:underline"
      >
        Forgot password?
      </Link>
    </AuthLayout>
  );
};

export default Login;
