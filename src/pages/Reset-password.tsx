import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import type { RootState, AppDispatch } from "reduxToolkit/store";
import { resetPassword } from "reduxToolkit/auth/authActions";
import { ROUTES } from "routes/paths";
import type { AuthFormConfig } from "utils/types";
import AuthFormBuilder from "components/auth/AuthFormBuilder";
import AuthLayout from "components/auth/AuthLayout";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, forgotEmail } = useSelector((state: RootState) => state.auth);
  const prevLoadingRef = useRef(loading);
  const hasShownErrorRef = useRef(false);

  const formConfig: AuthFormConfig = {
    title: "Set New Password",
    description: "Enter a strong password and confirm it to update your account.",
    submitButtonLabel: "Update Password",
    redirectLink: { text: "Back to Log In", to: ROUTES.LOGIN },
    fields: [
      {
        id: "password",
        name: "password",
        type: "password",
        placeholder: "Enter new password",
        required: true,
        validations: [
          { type: "required", message: "Password is required" },
          { type: "minLength", value: 6, message: "Password must be at least 6 characters" },
        ],
      },
      {
        id: "confirmPassword",
        name: "confirmPassword",
        type: "password",
        placeholder: "Confirm new password",
        required: true,
        validations: [
          { type: "required", message: "Confirm Password is required" },
          { type: "match", value: "password", message: "Passwords must match" },
        ],
      },
    ],
  };

  const handleSubmit = (values: Record<string, string>) => {
    dispatch(resetPassword(values.password));
  };

  
  useEffect(() => {
    
    if (!forgotEmail && !hasShownErrorRef.current) {
      toast.error("Please verify your email first");
      hasShownErrorRef.current = true;
      navigate(ROUTES.FORGOT_PASSWORD, { replace: true });
      return;
    }

    
    if (prevLoadingRef.current && !loading) {
      if (error) {
        
        toast.error(error);
      } else if (!forgotEmail) {
       
        toast.success("Password updated successfully! Please login with your new password.");
        setTimeout(() => {
          navigate(ROUTES.LOGIN, { replace: true });
        }, 1000);
      }
    }
    
    prevLoadingRef.current = loading;
  }, [loading, error, forgotEmail, navigate]);

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
        submitButtonLabel={loading ? "Updating..." : formConfig.submitButtonLabel}
        onSubmit={handleSubmit}
        error={error || undefined}
      />
    </AuthLayout>
  );
};

export default ResetPassword;