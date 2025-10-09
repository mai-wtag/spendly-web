import { Link } from "react-router-dom";
import { ROUTES } from "routes/paths";
import type { AuthFormConfig } from "components/auth/utils/types";
import AuthFormBuilder from "components/auth/AuthFormBuilder";
import AuthLayout from "components/auth/AuthLayout";

const Login: React.FC = () => {
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
          { type: "minLength", value: 6, message: "Password must be at least 6 characters" },
        ],
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
      footerLinkText="Sign up"
      footerLinkHref={formConfig.redirectLink.to}
    >
      <AuthFormBuilder
        fields={formConfig.fields}
        submitButtonLabel={formConfig.submitButtonLabel}
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
