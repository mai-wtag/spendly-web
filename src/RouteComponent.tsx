import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';

import Login from 'pages/login';
import Signup from 'pages/sign-up';
import ForgotPasswordPage from 'pages/forgot-password';
import ResetPassword from 'pages/reset-password';
import Dashboard from 'pages/dashboard';
import Transactions from 'pages/transactions';
import Goals from 'pages/budget-goals';
import Reports from 'pages/reports';
import Settings from 'pages/settings';
import PrivateRoute from 'components/routes/PrivateRoute';

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

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/budget-goals" element={<Goals />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RouteComponent;
