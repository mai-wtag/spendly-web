import { Routes, Route } from "react-router-dom";
import Login from "pages/Login";
import Signup from "pages/Sign-up";
import ForgotPasswordPage from "pages/Forgot-password";
import ResetPassword from "pages/Reset-password";
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
