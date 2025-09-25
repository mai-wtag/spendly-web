import { Routes, Route } from "react-router-dom";
import Login from "pages/Login";
import Signup from "pages/Sign-up";
import ForgotPasswordPage from "pages/ForgotPassword";
import SetPassword from "pages/SetPassword";

const RouteComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/set-password" element={<SetPassword />} />
    </Routes>
  );
};

export default RouteComponent;
