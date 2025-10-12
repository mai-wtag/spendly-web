import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import type { RootState, AppDispatch } from "reduxToolkit/store";
import { signup } from "reduxToolkit/auth/authActions";
import { ROUTES } from "routes/paths";
import type { AuthFormConfig } from "utils/types";
import AuthFormBuilder from "components/auth/AuthFormBuilder";
import AuthLayout from "components/auth/AuthLayout";

const Signup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const prevLoadingRef = useRef(loading);

  const formConfig: AuthFormConfig = {
    title: "Create your Spendly account",
    description: "Join us to manage your finances.",
    submitButtonLabel: "Create Account",
    redirectLink: { text: "Already have an account?", to: ROUTES.LOGIN },
    fields: [
      {
        id: "full-name",
        name: "fullName",
        placeholder: "Full Name",
        required: true,
        validations: [{ type: "required", message: "Full Name is required" }],
      },
      {
        id: "email",
        name: "email",
        type: "email",
        placeholder: "Email Address",
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
          { type: "minLength", value: 6, message: "Password must be at least 6 characters" },
        ],
      },
      {
        id: "confirm-password",
        name: "confirmPassword",
        type: "password",
        placeholder: "Confirm Password",
        required: true,
        validations: [
          { type: "required", message: "Please confirm your password" },
          { type: "match", value: "password", message: "Passwords must match" },
        ],
      },
    ],
  };

  const handleSubmit = (values: Record<string, string>) => {
    dispatch(signup(values.fullName, values.email, values.password));
  };

  
  useEffect(() => {
    
    if (prevLoadingRef.current && !loading) {
      if (error) {
       
        toast.error(error);
      } else if (user && !isAuthenticated) {
        
        toast.success("Account created successfully! Please login to continue.");
        setTimeout(() => {
          navigate(ROUTES.LOGIN, { replace: true });
        }, 1000);
      }
    }
    
    prevLoadingRef.current = loading;
  }, [loading, user, error, isAuthenticated, navigate]);

  return (
    <AuthLayout
      title={formConfig.title}
      subtitle={formConfig.description}
      footerText={formConfig.redirectLink.text}
      footerLinkText="Sign in"
      footerLinkHref={formConfig.redirectLink.to}
    >
      <AuthFormBuilder
        fields={formConfig.fields}
        submitButtonLabel={loading ? "Creating..." : formConfig.submitButtonLabel}
        onSubmit={handleSubmit}
        error={error || undefined}
      />
    </AuthLayout>
  );
};

export default Signup;