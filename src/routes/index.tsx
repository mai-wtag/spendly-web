import { Routes, Route } from "react-router-dom";
import Login from "pages/login";
import Signup from "pages/sign-up";
import ForgotPasswordPage from "pages/forgot-password";
import ResetPassword from "pages/reset-password";
import { ROUTES } from "./paths";

const RouteComponent: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGNUP} element={<Signup />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
      <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
    </Routes>
  );
};

export default RouteComponent;
