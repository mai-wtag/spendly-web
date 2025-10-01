import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "pages/Login";
import Signup from "pages/Sign-up";
import ForgotPasswordPage from "pages/Forgot-password";
import ResetPassword from "pages/Reset-password";
import Dashboard from "pages/Dashboard";
import PrivateRoute from "components/routes/PrivateRoute";

const RouteComponent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RouteComponent;
