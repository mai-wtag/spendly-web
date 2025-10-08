import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes/paths";
import AuthFormBuilder from "components/auth/AuthFormBuilder";
import AuthLayout from "components/auth/AuthLayout";
import type { AuthFormConfig } from "components/auth/utils/types";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  const formConfig: AuthFormConfig = {
    title: "Set New Password",
    description:
      "Enter a strong password and confirm it to update your account.",
    submitButtonLabel: "Update Password",
    redirectLink: { text: "Back to Log In", to: ROUTES.LOGIN },
    fields: [
      {
        id: "password",
        name: "password",
        type: "password",
        placeholder: "Enter new password",
        required: true,
      },
      {
        id: "confirmPassword",
        name: "confirmPassword",
        type: "password",
        placeholder: "Confirm new password",
        required: true,
      },
    ],
  };

  const handleSubmit = () => {
    navigate(ROUTES.LOGIN);
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

export default ResetPassword;
