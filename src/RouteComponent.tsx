import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "store";

import Login from "pages/Login";
import Signup from "pages/Sign-up";
import ForgotPasswordPage from "pages/Forgot-password";
import ResetPassword from "pages/Reset-password";
import Dashboard from "pages/Dashboard";
import Transactions from "pages/Transactions";
import Goals from "pages/Budget-goals";
import Reports from "pages/Reports";
import Settings from "pages/Settings";
import PrivateRoute from "components/routes/PrivateRoute";

const RouteComponent: React.FC = () => {

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
      />
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
      <Route
        path="/transactions"
        element={
          <PrivateRoute>
            <Transactions />
          </PrivateRoute>
        }
      />
      <Route
        path="/budget-goals"
        element={
          <PrivateRoute>
            <Goals />
          </PrivateRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RouteComponent;
