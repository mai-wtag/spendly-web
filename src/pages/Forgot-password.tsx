import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import type { RootState, AppDispatch } from "reduxToolkit/store";
import { forgotPassword } from "reduxToolkit/auth/authActions";
import { ROUTES } from "routes/paths";
import type { AuthFormConfig } from "utils/types";
import AuthFormBuilder from "components/auth/AuthFormBuilder";
import AuthLayout from "components/auth/AuthLayout";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, forgotEmail } = useSelector((state: RootState) => state.auth);
  const prevLoadingRef = useRef(loading);

  const formConfig: AuthFormConfig = {
    title: "Forgot Password?",
    description: "No worries, we'll send you reset instructions.",
    submitButtonLabel: "Reset Password",
    redirectLink: { text: "Back to Log In", to: ROUTES.LOGIN },
    fields: [
      {
        id: "email",
        name: "email",
        type: "email",
        placeholder: "Enter your email",
        required: true,
        validations: [
          { type: "required", message: "Email is required" },
          { type: "email", message: "Invalid email address" },
        ],
      },
    ],
  };

  const handleSubmit = (values: Record<string, string>) => {
    dispatch(forgotPassword(values.email));
  };

 
  useEffect(() => {
    
    if (prevLoadingRef.current && !loading) {
      if (error) {
        
        toast.error(error);
      } else if (forgotEmail) {
        
        toast.success("Email verified! You can now reset your password.");
        setTimeout(() => {
          navigate(ROUTES.RESET_PASSWORD, { replace: true });
        }, 800);
      }
    }
    
    prevLoadingRef.current = loading;
  }, [loading, forgotEmail, error, navigate]);

  return (
    <AuthLayout
      title={formConfig.title}
      subtitle={formConfig.description}
      footerText={formConfig.redirectLink.text}
      footerLinkText="Back to Log In"
      footerLinkHref={formConfig.redirectLink.to}
    >
      <AuthFormBuilder
        fields={formConfig.fields}
        submitButtonLabel={loading ? "Verifying..." : formConfig.submitButtonLabel}
        onSubmit={handleSubmit}
        error={error || undefined}
      />
    </AuthLayout>
  );
};

export default ForgotPassword;