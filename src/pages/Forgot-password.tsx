import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "reduxToolkit/store";
import { forgotPassword } from "reduxToolkit/auth/authActions";
import { ROUTES } from "routes/paths";
import type { AuthFormConfig } from "utils/formTypes";
import AuthFormBuilder from "components/auth/AuthFormBuilder";
import AuthLayout from "components/auth/AuthLayout";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, forgotEmail } = useSelector((state: RootState) => state.auth);
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
    if (prevLoadingRef.current && !loading && forgotEmail) {
      navigate(ROUTES.RESET_PASSWORD, { replace: true });
    }
    
    prevLoadingRef.current = loading;
  }, [loading, forgotEmail, navigate]);

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
      />
    </AuthLayout>
  );
};

export default ForgotPassword;
