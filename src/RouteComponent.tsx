import { Routes, Route } from "react-router-dom";
import Login from "pages/Login";
import Signup from "pages/Sign-up";
import ForgotPasswordPage from "pages/Forgot-password";
import ResetPassword from "pages/Reset-password";

const RouteComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};

export default RouteComponent;
