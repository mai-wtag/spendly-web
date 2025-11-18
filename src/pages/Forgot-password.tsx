import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes/paths";
import AuthFormBuilder from "components/auth/AuthFormBuilder";
import AuthLayout from "components/auth/AuthLayout";
import type { AuthFormConfig } from "components/auth/utils/types";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

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
      },
    ],
  };

  const handleSubmit = () => {
    navigate(ROUTES.RESET_PASSWORD);
  };

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
        submitButtonLabel={formConfig.submitButtonLabel}
        onSubmit={handleSubmit}
      />
    </AuthLayout>
  );
};

export default ForgotPassword;
