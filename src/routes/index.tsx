import { Routes, Route, Navigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "reduxToolkit/store";
import { ROUTES } from "./paths";

import Login from "pages/auth/Login";
import Signup from "pages/auth/Sign-up";
import ForgotPassword from "pages/auth/Forgot-password";
import ResetPassword from "pages/auth/Reset-password";

import Dashboard from "pages/dashboard/Dashboard";
import Transactions from "pages/dashboard/Transactions";
import BudgetGoals from "pages/dashboard/Budget-goals";
import Reports from "pages/dashboard/Reports";
import Settings from "pages/dashboard/Settings";

import PrivateRoute from "routes/PrivateRoute";

const RouteComponent: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      <Route
        path={ROUTES.LOGIN}
        element={isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <Login />}
      />
      <Route
        path={ROUTES.SIGNUP}
        element={isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <Signup />}
      />
      <Route
        path={ROUTES.FORGOT_PASSWORD}
        element={isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <ForgotPassword />}
      />
      <Route
        path={ROUTES.RESET_PASSWORD}
        element={isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <ResetPassword />}
      />

      <Route element={<PrivateRoute />}>
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.TRANSACTIONS} element={<Transactions />} />
        <Route path={ROUTES.BUDGET_GOALS} element={<BudgetGoals />} />
        <Route path={ROUTES.REPORTS} element={<Reports />} />
        <Route path={ROUTES.SETTINGS} element={<Settings />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN} replace />}
      />
    </Routes>
  );
};

export default RouteComponent;
