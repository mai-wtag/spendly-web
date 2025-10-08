import AuthFormBuilder from "components/auth/AuthFormBuilder";
import AuthLayout from "components/auth/AuthLayout";
import { ROUTES } from "routes/paths";
import type { AuthFormConfig } from "components/auth/utils/types";

const Signup: React.FC = () => {
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
      },
      {
        id: "email",
        name: "email",
        type: "email",
        placeholder: "Email Address",
        required: true,
      },
      {
        id: "password",
        name: "password",
        type: "password",
        placeholder: "Password",
        required: true,
      },
      {
        id: "confirm-password",
        name: "confirmPassword",
        type: "password",
        placeholder: "Confirm Password",
        required: true,
      },
    ],
  };

  const handleSubmit = () => {

  };

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
        submitButtonLabel={formConfig.submitButtonLabel}
        onSubmit={handleSubmit}
      />
    </AuthLayout>
  );
};

export default Signup;
